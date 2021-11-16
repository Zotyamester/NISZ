import React, { Component } from 'react';
import { Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';

import { isAuthenticated } from '../actions/auth';
import { addGroup } from '../actions/groups';

export class GroupNew extends Component {
    state = {
        name: '',
        description: '',
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const { name, description } = this.state;
        const group = { name, description };
        console.log(this.props);
        this.props.addGroup(group);
        this.setState({
            name: '',
            description: ''
        });
        this.props.history.push('/groups/');
    };

    render() {
        return (
            <div>
                {isAuthenticated() ? (
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="nameText">
                                Név*
                            </Label>
                            <Input
                                id="nameText"
                                name="name"
                                onChange={this.onChange}
                                value={this.state.name}
                                required
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
                                onChange={this.onChange}
                                value={this.state.description}
                            />
                        </FormGroup>
                        <Button type="submit" color="info" outline block>
                            Létrehozás
                        </Button>
                    </Form>
                ) : (
                    <div className="my-4 py-3 px-3 jumbotron">
                        Csoport létrehozásához <a href="/login?next=/groups/new/">jelentkezzen be</a> vagy <a href="/register?next=/groups/new/">regisztráljon</a>!
                    </div>
                )
                }
            </div>
        );
    }
}

export default connect(null, { addGroup })(GroupNew);
