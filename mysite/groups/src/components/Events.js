import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Calendar from 'react-awesome-calendar';
import { EventModal, dateToString } from './EventModal';
import 'moment/locale/hu';
import moment from 'moment';

import { getEvents } from '../actions/events';

export class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            event: { id: 0, from: 0, to: 0, title: '', owner_name: '' },
        };
        this.setModalShow = this.setModalShow.bind(this);
        this.setAndShowEvent = this.setAndShowEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.newEventFromTimeline = this.newEventFromTimeline.bind(this);
        this.newEvent = this.newEvent.bind(this);
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
        this.setState({ event: { id: event.id, from: event.from, to: event.to, title: event.title, owner_name: event.owner_name } });
        this.setModalShow(true);
    };

    editEvent = (id) => {
        this.setAndShowEvent(this.props.events.filter(event => event.id == id)[0]);
    };

    newEventFromTimeline = (date) => {
        console.log(date.month);
        const from = moment(`${ date.year }.${ date.month }.${ date.day }. ${ Math.floor(date.hour) }:${ Math.floor(date.hour % 1 * 60) }`, 'Y.M.D. H:m');
        const to = from.clone().add(1, 'hours');
        const event = { id: 0, from: dateToString(from), to: dateToString(to), title: 'Névtelen', owner_name: 'admin' };
        this.setAndShowEvent(event);
    };

    newEvent = () => {
        const from = moment();
        const to = from.clone().add(1, 'hours');
        const event = { id: 0, from: dateToString(from), to: dateToString(to), title: 'Névtelen', owner_name: 'admin' };
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
                <div className="border rounded px-4 my-2 bg-white vh-25">
                    <Calendar
                        events={this.props.events}
                        onClickEvent={this.editEvent}
                        onClickTimeLine={this.newEventFromTimeline}
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
