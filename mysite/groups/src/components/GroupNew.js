import React, { Component } from 'react';

import { Form, FormGroup, Label, Button, Input } from 'reactstrap';

export class GroupNew extends Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="nameText">
                        Név
                    </Label>
                    <Input
                        id="nameText"
                        name="name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="descriptionText">
                        Leírás
                    </Label>
                    <Input
                        id="descriptionText"
                        name="description"
                        type="textarea"
                    />
                </FormGroup>
                <Button color="info" outline block>
                    Létrehozás
                </Button>
            </Form>
        );
    }
}

export default GroupNew;
