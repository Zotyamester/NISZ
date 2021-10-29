import React, { Component } from 'react';

import { Events } from './Events';

const Header = (props) => {
    return (
        <div>
            <h1>Országgyűlés Hivatala</h1>
            <p>A legfontosabb intézmény az országban.</p>
        </div>
    );
};


export class Group extends Component {
    render() {
        return (
            <div className="bg-light mt-3 p-4 border rounded">
                <Header />
                <Events />
            </div>
        );
    }
}

export default Group;
