import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { everyGroup } from '../dummy';

export class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            matchingGroups: everyGroup
        };
        this.searchInput = this.searchInput.bind(this);
    }

    searchInput(event) {
        const text = event.target.value;
        this.setState({
            searchText: text,
            matchingGroups: everyGroup.filter(group => group.name.includes(text) || group.description.includes(text))
        });
    }

    render() {
        const matchingGroups = this.state.matchingGroups.map(group => (
            <Card key={group.id} className="mx-auto my-2 bg-white">
                <Card.Body>
                    <Card.Title>{group.name}</Card.Title>
                    <Card.Text>
                        <Badge bg="info">Tagok száma: <Badge bg="light" className="text-dark">{group.member_count}</Badge></Badge>
                        <br />
                        {group.description}
                    </Card.Text>
                    <Link className="btn btn-primary" to={'/groups/g/' + group.id + '/'}>Megnézem</Link>
                </Card.Body>
            </Card>
        ));
        return (
            <div>
                <InputGroup className="rounded">
                    <FormControl
                        placeholder="Keresés"
                        aria-label="Keresés"
                        aria-describedby="search-addon"
                        className="rounded"
                        value={this.state.searchText}
                        onChange={this.searchInput}
                    />
                    <InputGroup.Text id="search-addon" className="border-0">
                        <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                </InputGroup>
                <div className="mt-3">
                    {matchingGroups}
                </div>
            </div>
        );
    }
}

export default Groups;
