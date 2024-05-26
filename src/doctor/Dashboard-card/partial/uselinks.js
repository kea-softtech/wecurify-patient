import { NavLink } from "react-router-dom";
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { FaClinicMedical } from 'react-icons/fa';
export default function UserLinks() {

    return (
        <div className="sidemenu" align='left'>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to="/doctors">
                <div className="dashboard">
                    <PersonIcon style={{ fontSize: 20 }} />
                    <b className="fontSize ml-1">Doctor Management</b>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active" : 'none')}
                to="/allpatient">
                <div className="dashboard ">
                    <AccessTimeRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize ml-1">Patient Management</b>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to='/subscription'>
                <div className="dashboard">
                    <AttachMoneyRoundedIcon style={{ fontSize: 20 }} />
                    <b className="fontSize ml-1">Subscription</b>
                </div>
            </NavLink>
            <NavLink
                className={({ isActive }) => (isActive ? "Nav-active " : 'none')}
                to='/clinic'>
                <div className="dashboard">
                    <FaClinicMedical style={{ fontSize: 18 }} />
                    <b className="fontSize ml-1">Clinics</b>
                </div>
            </NavLink>
        </div>
    )
}  
