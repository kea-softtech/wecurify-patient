import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import CalendarModalBox from './partial/CalendarModalBox';
import { MainNav } from '../../mainComponent/mainNav';
import { Wrapper } from '../../mainComponent/Wrapper';
import PatientApi from '../../services/PatientApi';
import Loader from '../../patient/patientHistory/Loader';
const localizer = momentLocalizer(moment)

export default function Calender() {
  const { patientId } = useParams();
  const { getpaymentData } = PatientApi()
  const [getData, setGetData] = useState([])
  const [show, setShow] = useState(false);
  const [appointmentId, setAppointmentId] = useState('')
  const [patientList, setPatientList] = useState([])
  const [AppointmentData, setAppointmentData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    patientData()
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const handleClose = () => {
    setShow(false)
  }

  const handleModalButtonClick = (item) => {
    setAppointmentData(item)
    setShow(true)
    setAppointmentId(item.id)
  }

  const patientData = () => {
    getpaymentData({ patientId })
      .then((res) => {
        if (res) {
          const calendarData = []
          res['test'] && res['test'].map((item) => {
            if (item.dependentId) {
              calendarData.push({
                // item['dependentDetails'][0].name
                title: `Dr. ${item['doctorDetails'][0].name} (${item['dependentDetails'][0].name})`,
                drName: item['doctorDetails'][0].name,
                patientName: item['dependentDetails'][0].name,
                patientId: item['dependentDetails'][0]._id,
                id: item._id,
                start: new Date(item.startDate),
                end: new Date(moment(item.startDate).add({ hours: 0, minutes: item.timeSlot }).toString()),
                timeslots: item.timeSlot,
                status: item.status,
              })
            } else {
              calendarData.push({
                title: `Dr. ${item['doctorDetails'][0].name} (${item['patientDetails'][0].name})`,
                drName: item['doctorDetails'][0].name,
                patientName: item['patientDetails'][0].name,
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
        }
        else {
          return <span className="validation mb-2">Server error</span>
        }

      })
  }

  const eventPropGetter = (event) => {
    const backgroundColor = event.status === "Ongoing" ? '#c0d2fc' : '#edebeb';
    const color = event.status === "Ongoing" ? '#333' : '#333';
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
          {isLoading ?
            <div className='loader-container'>
              <Loader />
            </div>
            :
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
                style={{ height: 'calc(80vh - 80px)', width: '100%', cursor: 'pointer' }}
              />
            </div>
          }
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CalendarModalBox
            handleClose={handleClose}
            AppointmentData={AppointmentData}
            patientList={patientList}
            appointmentId={appointmentId} onSubmit={handleModalButtonClick} />
        </Modal.Body>
      </Modal>
    </Wrapper>

  )
}