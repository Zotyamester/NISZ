import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, Card, CardText, CardSubtitle, CardTitle, CardBody, Badge, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import { everyGroup } from '../dummy';

export class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            matchingGroups: [...everyGroup]
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
                <CardBody>
                    <CardTitle tag="h5">{group.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">{group.owner}</CardSubtitle>
                    <CardText>
                        <Badge color="success" className="text-white">Tagok száma: <Badge color="light" className="text-success">{group.member_count}</Badge></Badge>
                        <br />
                        {group.description}
                    </CardText>
                    <Link className="btn btn-primary" to={'/groups/g/' + group.id + '/'}>Megnézem</Link>
                </CardBody>
            </Card>
        ));
        return (
            <div>
                <InputGroup className="">
                    <Input
                    type="search"
                        placeholder="Keresés"
                        value={this.state.searchText}
                        onChange={this.searchInput}
                    />
                    <Link className="btn btn-primary" to="/groups/new/">
                        <FontAwesomeIcon icon={faPlus} /> Új
                    </Link>
                </InputGroup>
                <div className="mt-3">
                    {matchingGroups}
                </div>
            </div>
        );
    }
}

export default Groups;
