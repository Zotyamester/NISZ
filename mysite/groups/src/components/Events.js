import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Calendar from 'react-awesome-calendar';
import { EventModal, dateToString } from './EventModal';
import 'moment/locale/hu';
import moment from 'moment';

const everyEvent = [
    {
        id: 1,
        color: '#fd3153',
        from: '2021.10.25. 00:00',
        to: '2021.10.27. 00:00',
        title: 'This is an event',
        owner: 'admin'
    },
    {
        id: 2,
        color: '#1ccb9e',
        from: '2021.10.28. 00:00',
        to: '2021.10.30. 00:00',
        title: 'This is another event',
        owner: 'admin'
    },
    {
        id: 3,
        color: '#3694DF',
        from: '2021.10.27. 00:00',
        to: '2021.10.27. 00:00',
        title: 'This is also another event',
        owner: 'admin'
    }
];

export class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            focusedEvent: { id: 0, from: '', to: '', title: '', owner: '' },
            events: everyEvent
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setAndShowEvent = this.setAndShowEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.newEventFromTimeline = this.newEventFromTimeline.bind(this);
        this.newEvent = this.newEvent.bind(this);
    }

    setModalShow(val) {
        this.setState({ modalShow: val });
    }

    setAndShowEvent(event) {
        console.log(event);
        this.setState({ focusedEvent: { id: event.id, from: event.from, to: event.to, title: event.title, owner: event.owner } });
        this.setModalShow(true);
    }

    editEvent(id) {
        this.setAndShowEvent(this.state.events.filter(event => event.id == id)[0]);
    }

    newEventFromTimeline(date) {
        const from = moment(`${ date.year }.${ date.month }.${ date.day }. ${ Math.floor(date.hour) }:${ Math.floor(date.hour % 1 * 60) }`, 'Y.M.D. H:m');
        const to = from.add(1, 'hours');
        const event = { id: 0, from: dateToString(from), to: dateToString(to), title: 'Névtelen', owner: 'admin' };
        this.setAndShowEvent(event);
    }

    newEvent() {
        const from = moment();
        const to = from.add(1, 'hours');
        const event = { id: 0, from: dateToString(from), to: dateToString(to), title: 'Névtelen', owner: 'admin' };
        this.setAndShowEvent(event);
    }

    render() {
        return (
            <div>
                <EventModal
                    event={this.state.focusedEvent}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
                <div className="border rounded px-4 my-2 bg-white vh-25">
                    <Calendar
                        events={this.state.events}
                        onClickEvent={this.editEvent}
                        onClickTimeLine={this.newEventFromTimeline}
                    />
                </div>
                <div className="my-2 d-grid gap-2">
                    <Button variant="primary" onClick={this.newEvent}>
                        Add Event
                    </Button>
                </div>
            </div>
        );
    }
}

export default Events;

