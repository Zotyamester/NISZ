import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl, Card, Button } from 'react-bootstrap';

const everyGroup = [
    {
        'name': 'Országgyűlés',
        'description': 'A legfontosabb intézmény az országban.',
        'member_count': 199
    },
    {
        'name': 'Fidesz-GANG',
        'description': 'Abszurdisztán fővárosa Mutyipuszta',
        'member_count': 133
    },
    {
        'name': 'Gyurcsány-SHOW',
        'description': 'Soros-terv!',
        'member_count': 66
    }
];

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
            <Card className="mx-auto my-2 bg-white">
                <Card.Body>
                    <Card.Title>{group.name}</Card.Title>
                    <Card.Text>
                        <Badge bg="info">Tagok száma: <Badge bg="light" className="text-dark">{group.member_count}</Badge></Badge>
                        <p>{group.description}</p>
                    </Card.Text>
                    <Button variant="primary">Megnézem</Button>
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
                <div className="mt-3 border rounded p-4 bg-light">
                    {matchingGroups}
                </div>
            </div>
        );
    }
}

export default Groups;
