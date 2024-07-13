import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import CalendarModalBox from './partial/CalendarModalBox';
import { MainNav } from '../../mainComponent/mainNav';
import { Wrapper } from '../../mainComponent/Wrapper';
import { useRecoilState } from "recoil";
import AppointmentApi from '../../services/AppointmentApi';
import PatientApi from '../../services/PatientApi';
const localizer = momentLocalizer(moment)

export default function Calender() {
  const { patientId } = useParams();
  const { getPatientListDetails } = AppointmentApi()
  const { getpaymentData } = PatientApi()
  const [getData, setGetData] = useState([])
  const [show, setShow] = useState(false);
  const [patientIdDetails, setPatientIdDetails] = useState([])
  const [patientList, setPatientList] = useState([])

  useEffect(() => {
    //   handleOnSelectSlot();
    patientData()
  }, [])

  const handleClose = () => {
    setShow(false)
  }

  const handleModalButtonClick = (item) => {
    const patientId = item.patientId
    setShow(true)
    setPatientIdDetails(patientId)
  }

  const patientData = () => {
    getpaymentData({ patientId })
      .then((res) => {
        const calendarData = []
        res['test'] && res['test'].map((item) => {
          if (item.dependentId) {
            calendarData.push({
              title: item['dependentDetails'][0].name,
              patientId: item['dependentDetails'][0]._id,
              id: item._id,
              start: new Date(item.startDate),
              end: new Date(moment(item.startDate).add({ hours: 0, minutes: item.timeSlot }).toString()),
              timeslots: item.timeSlot,
              status: item.status,
            })
          } else {
            calendarData.push({
              title: item.patientDetails[0].name,
              patientId: item.patientDetails[0]._id,
              id: item._id,
              start: new Date(item.startDate),
              end: new Date(moment(item.startDate).add({ hours: 0, minutes: item.timeSlot }).toString()),
              timeslots: item.timeSlot,
              status: item.status,
            })
          }
          setPatientList(item)
          setGetData(calendarData);
        })
      })
  }

  const eventPropGetter = (event) => {
    const backgroundColor = event.status === "Completed" ? '#c0d2fc' : '#edebeb';
    const color = event.status === "Completed" ? '#333' : '#333';
    return { style: { backgroundColor, color } }
  }

  return (
    <Wrapper>
      <MainNav>
        <ul className="clearfix">
          <div className="width50">
            <Link to={`/`}>
              <i className="arrow_back backArrow" title="back button"></i>
            </Link>
            <span className='float-none ml-2' style={{ fontSize: 'inherit' }}>Schedule </span>
          </div>
        </ul>
      </MainNav>
      <div className="wraper row">
        <div className="common_box full-width">
          <div className="myCustomHeight ">
            <Calendar
              messages={{
                agenda: 'Schedule'
              }}
              localizer={localizer}
              events={getData}
              startAccessor="start"
              endAccessor="end"
              defaultView='agenda'
              eventPropGetter={eventPropGetter}
              showMultiDayTimes={true}
              selectable={true}
              onSelectEvent={handleModalButtonClick}
              // style={{width:1000, height:500}}
              style={{ height: 'calc(80vh - 80px)', width: '100%', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarModalBox
            patientList={patientList}
            // doctorId={doctorId}
            patientId={patientIdDetails} onSubmit={handleModalButtonClick} />
        </Modal.Body>
      </Modal>
    </Wrapper>

  )
}