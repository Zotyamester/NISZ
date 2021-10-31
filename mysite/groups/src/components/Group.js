import React, { Component } from 'react';

import { Events } from './Events';

import { everyGroup } from '../dummy';

export class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: everyGroup.filter(g => g.id == props.match.params.id)[0]
        };
    }
    render() {
        return (
            <div className="bg-light mt-3 p-4 border rounded">
                <div>
                    <h1>{this.state.group.name}</h1>
                    <p>{this.state.group.description}</p>
                </div>
                <Events />
            </div>
        );
    }
}

export default Group;
