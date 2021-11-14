import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGroup } from '../actions/groups';
import { Events } from './Events';

export class Group extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getGroup(this.props.match.params.id);
    }

    render() {
        return (
            <div className="bg-light mt-3 p-4 border rounded">
                <div>
                    <h1>{this.props.group.name}</h1>
                    <h2 className="mb-2 text-muted">{this.props.group.owner_name}</h2>
                    <p>{this.props.group.description}</p>
                </div>
                <Events group={this.props.group} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ group: state.groups.group });

export default connect(mapStateToProps, { getGroup })(Group);
