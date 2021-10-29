import React, { Component } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';
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

        this.refreshState();
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
                show={this.props.show}
                onShow={this.refreshState}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Esemény
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{this.props.event.owner}</h4>
                    <p>
                        {this.state.title} ({this.state.from} - {this.state.to})
                    </p>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Esemény neve</Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={this.titleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupDatetime">
                            <Form.Label>Kezdeti dátum</Form.Label>
                            <Datetime locale="hu" initialViewMode="days" updateOnView="time" value={this.state.from} onChange={this.fromChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupDatetime">
                            <Form.Label>Végső dátum</Form.Label>
                            <Datetime locale="hu" initialViewMode="days" updateOnView="time" value={this.state.to} onChange={this.toChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">Delete</Button>
                    <Button variant="success">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EventModal;
