import React, {Component} from 'react';
import './EventCalendar.css';
import moment from 'moment';
import FullCalender from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import {
      MDBModal,
      MDBModalBody,
      MDBModalHeader,
      MDBModalFooter,
      MDBDatePicker,
      MDBTimePicker,
      MDBBtn,
      MDBInput
    } from "mdbreact"

export default class EventCalendar extends Component{
    calendarComponentRef = React.createRef()
    state = {
        modal: false,
        calendarEvents:[]
    }
    render(){
        return(
            <>
            <FullCalender 
            defaultView="dayGridMonth"
            selectable={true}
            customButtons={{
                myCustomButton: {
                    text: 'Add Event',
                    click: this.toggleModal
                    },
                }}
            header={{
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }} 
            
            plugins={[ dayGridPlugin, timeGridPlugin , listPlugin, interactionPlugin]}
            //weekends={true}
            ref={ this.calendarComponentRef }
            events={ this.state.calendarEvents }
            />
            
            <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
                <MDBModalHeader
                    className="text-center"
                    titleClass="w-100 font-weight-bold"
                    toggle={this.toggleModal}
                >
                    Add new event
                </MDBModalHeader>
                <MDBModalBody>
                    <div className="d-flex align-items-center bd-highlight mb-3" style={{ height: '50px' }}>
                        <div className="p-2 bd-highlight">From:</div>
                        <div className="p-2 bd-highlight"><MDBDatePicker getValue={this.getFromDate} /></div>
                        <div className="p-2 bd-highlight"><MDBTimePicker getValue={this.getFromTime} /></div>
                    </div>
                    <div className="d-flex align-items-center bd-highlight mb-3" style={{ height: '50px' }}>
                        <div className="p-2 bd-highlight">To:</div>
                        <div className="p-2 bd-highlight"><MDBDatePicker getValue={this.getToDate} /></div>
                        <div className="p-2 bd-highlight"><MDBTimePicker getValue={this.getToTime}/></div>
                    </div>
                    <div className="d-flex align-items-center" style={{ height: '50px' }}>
                        <div className="p-2 bd-highlight"><MDBInput label="Event Title:" onInput={this.handleInput} /></div>
                        <div className="p-2 bd-highlight"><MDBBtn color="primary" rounded onClick={this.addEvent}>Add Event</MDBBtn></div>
                    </div>  
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                </MDBModalFooter>
            </MDBModal>
            </>
        )
    }
    toggleModal = () => {
        this.setState({
          modal: !this.state.modal
        });
      };

    alertMsg = () => {
        alert('Custom Button Clicked!')
    }

    getFromDate = value => {
        this.state.fromDate = value;
        //alert(value);
    }

    getFromTime = value => {
        this.state.fromTime = value;
        //alert(value);
    }

    getToDate = value => {
        this.state.toDate = value;
        //alert(value);
    }

    getToTime = value => {
        this.state.toTime = value;
        //alert(value);
    }

    handleInput = (event) => {
        this.setState({
            event_title: event.target.value
        })
    }

    addEvent = () => {
        var fdString = moment(this.state.fromDate).format('DD-MM-YYYY') + ' ' +moment(this.state.fromTime, "hh:mmA").format("hh:mmA");
        var mfDate = new moment(fdString, 'DD-MM-YYYY hh:mmA');
        var tdString = moment(this.state.toDate).format('DD-MM-YYYY') + ' ' +moment(this.state.toTime, "hh:mmA").format("hh:mmA");
        var tfDate = new moment(tdString, 'DD-MM-YYYY hh:mmA');
        var fromDate = new Date(this.state.fromDate);
        var toDate = new Date(this.state.toDate);
        fromDate.setTime(mfDate.valueOf());
        toDate.setTime(tfDate.valueOf());
        //alert(this.state.event_title);
        this.setState({
            calendarEvents: this.state.calendarEvents.concat({
                title: this.state.event_title,
                start: fromDate,
                end: toDate,
                allDay: false,
                color: 'pink',
                //editable: true
            })
        })
    }
}