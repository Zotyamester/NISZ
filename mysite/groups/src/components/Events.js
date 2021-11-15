import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import huLocale from '@fullcalendar/core/locales/hu';
import { EventModal } from './EventModal';
import 'moment/locale/hu';
import moment from 'moment';

import { getEvents } from '../actions/events';
import { USERNAME } from '../actions/auth';

export class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            event: { id: 0, start: null, end: null, title: '', owner_name: '' },
        };
    }

    componentDidMount() {
        let date = new Date();
        let firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1).getTime();
        let lastDay = new Date(date.getUTCFullYear(), date.getUTCMonth() + 1, 0).getTime();
    }

    setModalShow = (val) => {
        this.setState({ modalShow: val });
    };

    setAndShowEvent = (event) => {
        this.setState({ event: event });
        this.setModalShow(true);
    };

    editEvent = (info) => {
        const e = info.event;
        const event = { id: e.extendedProps.id, start: e.start, end: e.end, title: e.title, owner_name: e.extendedProps.owner_name };
        this.setAndShowEvent(event);
    };

    newEventFromTimeline = (date) => {
        const event = { id: 0, start: date.start, end: date.end, title: 'Névtelen', owner_name: USERNAME };
        this.setAndShowEvent(event);
    };

    newEvent = () => {
        const start = moment();
        const end = start.clone().add(1, 'hours');
        const event = { id: 0, start: start.toDate(), end: end.toDate(), title: 'Névtelen', owner_name: USERNAME };
        this.setAndShowEvent(event);
    };

    render() {
        return (
            <div>
                <EventModal
                    event={this.state.event}
                    isOpen={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
                <div className="border rounded p-4 my-2 bg-white">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        locales={[huLocale]}
                        locale="hu"
                        selectable={true}
                        events={this.props.events}
                        eventClick={this.editEvent}
                        select={this.newEventFromTimeline}
                    />
                </div>
                <div className="my-2 d-grid gap-2">
                    <Button color="primary" block type="button" onClick={this.newEvent}>
                        Esemény létrehozása
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ events: state.events.events });

export default connect(mapStateToProps, { getEvents })(Events);
