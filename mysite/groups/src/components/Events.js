import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Calendar from 'react-awesome-calendar';
import { EventModal, dateToString } from './EventModal';
import 'moment/locale/hu';
import moment from 'moment';

import { everyEvent } from '../dummy';

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

    componentDidMount() {
        // let date = new Date();
        // let firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).getTime();
        // let lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getTime();
        // this.props.getEvents(action.payload.id, firstDay, lastDay);
    }

    setModalShow(val) {
        this.setState({ modalShow: val });
    }

    setAndShowEvent(event) {
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
                    isOpen={this.state.modalShow}
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
                        Esemény létrehozása
                    </Button>
                </div>
            </div>
        );
    }
}

export default Events;

