import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { MainNav } from "../mainComponent/mainNav";
import { makeStyles } from "@mui/styles";
import { Wrapper } from "../mainComponent/Wrapper";
import UserLinks from "../doctor/Dashboard-card/partial/uselinks";
import SubscriptionApi from '../services/SubscriptionApi'
import SubscriptionModal from "./SubscriptionModal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditSubscriptionModal from "./EditSubscriptionModal";
import AddFeature from "./AddFeature";

export default function Subscription() {
    const { deleteSubscriptionPlan, getSubscriptionPlans } = SubscriptionApi()
    const [getSubData, setGetSubData] = useState([])
    const [subModal, setSubModal] = useState(false)
    const [activeModal, setActiveModal] = useState();
    const [feature, setFeature] = useState(false)
    const useStyles = makeStyles((theme) => ({
        formControl: {
            // margin: theme.spacing(1),
            minWidth: 120
        },
        selectEmpty: {
            // marginTop: theme.spacing(2)
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        getSubscriptionData()
    }, [getSubData])

    const getSubscriptionData = () => {
        getSubscriptionPlans()
            .then((res) => {
                setGetSubData(res);
            })
    }

    const deleteSubscription = (item) => {
        const id = item._id
        deleteSubscriptionPlan(id)
            .then(() => {
                getSubscriptionData()
            })
    }
    const handleClose = () => {
        setActiveModal(null)
    }
    const handleShow = (e, index) => {
        setActiveModal(index)
    };
    const EditData = () => {
        handleClose(true);
    }
    const handleSubClose = () => {
        setSubModal(false)
    }
    const handleSubShow = () => {
        setSubModal(true)
    }
    const handleFeatureClose = () => {
        setFeature(false)
    }
    const handleFeatureShow = () => {
        setFeature(true)
    }
    return (
        <Wrapper>
            <MainNav>
                <div className="clearfix row">
                    <div className="width50">
                        <span className='float-none' style={{ fontSize: 'inherit', }}>Subscription</span>
                    </div>
                    <div className="width50 row justifyContent">
                        <Button
                            type="submit"
                            onClick={() => handleSubShow()}
                            variant="default"
                            className='appColor  mr-3 btn_sub'>
                            Add New Plan
                        </Button>
                        <Button
                            type="submit"
                            onClick={() => handleFeatureShow()}
                            variant="default"
                            className='appColor btn_sub'>
                            Add Feature
                        </Button>
                    </div>
                </div>
            </MainNav>
            <div className='row'>
                <div className="width16">
                    <div className="dash row">
                        <UserLinks />
                    </div>
                </div>
                <div className="width84">
                    <div className='common_box '>
                        <TableContainer component={Paper} >
                            <Table className={classes.table} size="large" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left"><b>Plan Name</b></TableCell>
                                        <TableCell align="left"><b>Billing cycle</b></TableCell>
                                        <TableCell align="left"><b>Amount</b></TableCell>
                                        <TableCell align="left"><b>Features</b></TableCell>
                                        <TableCell align="left"><b>Status</b></TableCell>
                                        <TableCell align="left"><b>Actions</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                {getSubData.length > 0 ?
                                    <TableBody>
                                        {getSubData.map((item, i) => {
                                            return (
                                                <>
                                                    <Modal show={activeModal === i}
                                                        onHide={handleClose}
                                                        id={`education-${item._id}`}
                                                        key={item._id}>
                                                        <Modal.Header closeButton >
                                                            <Modal.Title>Update Subscription</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <EditSubscriptionModal
                                                                onClick={handleClose}
                                                                onSubmit={EditData}
                                                                planId={item._id}
                                                                plan={item}
                                                            />
                                                        </Modal.Body>
                                                    </Modal>
                                                    <TableRow className="rowHieght">
                                                        <TableCell align="left">
                                                            {item.name}
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {item.frequency} Days
                                                        </TableCell>
                                                        <TableCell align="left">
                                                            {item.amount}
                                                        </TableCell>
                                                        <TableCell align="left" className="scroll">
                                                            {getSubData.length > 0 ?
                                                                <>
                                                                    {item["features"].map((data, i) => {
                                                                        return (
                                                                            <span key={i}>
                                                                                {i + 1}. {data}<br />
                                                                            </span>
                                                                        )
                                                                    })}
                                                                </>
                                                                : null}
                                                        </TableCell>
                                                        {
                                                            item.status === true ?
                                                                <TableCell align="left">
                                                                    Active
                                                                </TableCell>
                                                                :
                                                                <TableCell align="left">
                                                                    Inactive
                                                                </TableCell>
                                                        }

                                                        <TableCell>
                                                            <div className='row'>
                                                                <Link
                                                                    onClick={e => handleShow(e, i)}
                                                                    to="#"
                                                                    className="editbutton">
                                                                    <i className="icon_pencil-edit"
                                                                        title="Edit profile">
                                                                    </i>
                                                                </Link>
                                                                <Link
                                                                    onClick={e => deleteSubscription(item)}
                                                                    to="#"
                                                                    align='right'
                                                                    className="editbutton">
                                                                    <i className="icon-trash-2"
                                                                        title="delete profile">
                                                                    </i>
                                                                </Link>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )
                                        })}
                                    </TableBody>
                                    : null}
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>

            <Modal show={subModal} onHide={handleSubClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SubscriptionModal onClick={handleSubClose} />
                </Modal.Body>
            </Modal>

            <Modal show={feature} onHide={handleFeatureClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feature</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddFeature onClick={handleFeatureClose} />
                </Modal.Body>
            </Modal>
        </Wrapper>
    )
}