import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import { addEvent, deleteEvent } from '../actions/events';

export const dateToString = (date) => (date.format('YYYY.MM.DD. H:mm'));

export class EventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            from: '',
            to: '',
            title: '',
            owner_name: ''
        };
    }

    refreshState = () => {
        this.setState({
            id: this.props.event.id,
            from: this.props.event.from,
            to: this.props.event.to,
            title: this.props.event.title,
            owner_name: this.props.event.owner_name
        });
    };

    titleChange = (event) => {
        this.setState({ title: event.target.value });
    };

    fromChange = (event) => {
        this.setState({ from: dateToString(event) });
    };

    toChange = (event) => {
        this.setState({ to: dateToString(event) });
    };

    addEvent = (e) => {
        e.preventDefault();
        const { title, from, to } = this.state;
        const event = { title, from, to };
        this.props.addEvent = event;
        this.props.onHide();
    };

    updateEvent = (e) => {
        e.preventDefault();
        const { title, from, to } = this.state;
        const event = { title, from, to };
        this.props.updateEvent = event;
        this.props.onHide();
    };

    deleteEvent = (e) => {
        e.preventDefault();
        const { title, from, to } = this.state;
        const event = { title, from, to };
        this.props.deleteEvent = event;
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
                        {this.state.title} ({this.state.from} - {this.state.to})
                    </p>
                    <Form>
                        <FormGroup className="mb-3">
                            <Label for="title">Esemény neve</Label>
                            <Input value={this.state.title} onChange={this.titleChange} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label for="startDate">Kezdeti dátum</Label>
                            <Datetime locale="hu" initialViewMode="days" updateOnView="time" value={this.state.from} onChange={this.fromChange} />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Label for="endDate">Végső dátum</Label>
                            <Datetime locale="hu" initialViewMode="days" updateOnView="time" value={this.state.to} onChange={this.toChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {
                        (this.state.id != 0) ?
                            <FormGroup>
                                <Button color="danger" type="button" onClick={this.deleteEvent}>Törlés</Button>
                                <Button color="success" type="button" onClick={this.updateEvent}>Mentés</Button>
                            </FormGroup>
                            :
                            <Button color="success" type="button" onClick={this.addEvent}>Létrehozás</Button>
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

export default connect(null, { addEvent, deleteEvent })(EventModal);
