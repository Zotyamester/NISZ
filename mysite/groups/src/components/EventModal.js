import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { addEvent, deleteEvent } from '../actions/events';
import moment from 'moment';

export const dateToString = (date) => (moment(date).format('YYYY.MM.DD. H:mm'));

export class EventModal extends Component {
    state = {
        id: 0,
        start: null,
        end: null,
        title: '',
        owner_name: '',
    };

    refreshState = () => {
        this.setState({ ...this.props.event });
    };

    titleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    startChange = (event) => {
        this.setState({ start: event });
    };

    endChange = (event) => {
        this.setState({ end: event });
    };

    onAddEvent = (e) => {
        e.preventDefault();
        const { title, start, end } = this.state;
        const event = { title, start, end };
        console.log(this.props);
        this.props.addEvent(event);
        this.props.onHide();
    };

    onUpdateEvent = (e) => {
        e.preventDefault();
        const { title, start, end } = this.state;
        const event = { title, start, end };
        //this.props.updateEvent(event);
        this.props.onHide();
    };

    onDeleteEvent = (e) => {
        e.preventDefault();
        const { title, start, end } = this.state;
        const event = { title, start, end };
        this.props.deleteEvent(event);
        this.props.onHide();
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onOpened={this.refreshState}
                size="lg"
            >
                <ModalHeader
                    close={<button className="close" onClick={this.props.onHide}>×</button>}
                >
                    Esemény
                </ModalHeader>
                <ModalBody>
                    <h4>{this.state.owner_name}</h4>
                    <p>
                        {this.state.title} ({dateToString(this.state.start)} - {dateToString(this.state.end)})
                    </p>
                    <Form>
                        <FormGroup className="mb-3">
                            <Label for="title">Esemény neve</Label>
                            <Input value={this.state.title} onChange={this.titleChange} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label for="startDate">Kezdeti dátum</Label>
                            <Datetime
                                locale="hu"
                                initialViewMode="days"
                                value={this.state.start}
                                onChange={this.startChange}
                                isValidDate={(cur, sel) => cur <= this.state.end}
                                timeConstraints={
                                    {
                                        hours: { max: moment(this.state.end).hour() },
                                        minutes: { max: moment(this.state.end).minutes() },
                                    }
                                } />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label for="endDate">Végső dátum</Label>
                            <Datetime
                                locale="hu"
                                initialViewMode="days"
                                value={this.state.end}
                                onChange={this.endChange}
                                isValidDate={(cur, sel) => cur >= this.state.start}
                                timeConstraints={
                                    {
                                        hours: { min: moment(this.state.start).hour() },
                                        minutes: { min: moment(this.state.start).minutes() },
                                    }
                                } />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {
                        (this.state.id != 0) ?
                            <FormGroup>
                                <Button color="danger" type="button" onClick={this.onDeleteEvent}>Törlés</Button>
                                <Button color="success" type="button" onClick={this.onUpdateEvent}>Mentés</Button>
                            </FormGroup>
                            :
                            <Button color="success" type="button" onClick={this.onAddEvent}>Létrehozás</Button>
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, { addEvent, deleteEvent })(EventModal);
