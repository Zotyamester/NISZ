import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';

export const dateToString = (date) => (date.format('YYYY.MM.DD. H:m'));

export class EventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            title: '',
            owner: ''
        };
        this.refreshState = this.refreshState.bind(this);
        this.titleChange = this.titleChange.bind(this);
        this.fromChange = this.fromChange.bind(this);
        this.toChange = this.toChange.bind(this);
    }

    refreshState() {
        this.setState({
            from: this.props.event.from,
            to: this.props.event.to,
            title: this.props.event.title,
            owner: this.props.event.owner
        });
    }

    titleChange(event) {
        this.setState({ title: event.target.value });
    }

    fromChange(event) {
        this.setState({ from: dateToString(event) });
    }

    toChange(event) {
        this.setState({ to: dateToString(event) });
    }

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
                    <h4>{this.props.event.owner}</h4>
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
                    <Button color="danger">Delete</Button>
                    <Button color="success">Save changes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default EventModal;
