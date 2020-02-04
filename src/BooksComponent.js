import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import { withCookies } from 'react-cookie';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";

class BooksComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://sf5.api.local.wip:8000/api/books", {
            headers: { 'X-AUTH-TOKEN': "_apiTokenXYZ_@321" }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.books
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <Container>

                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    <CardDeck>

                        { items.map((item) => (
                            <Card style={{ width: '18rem' }} key={item.isbn}>
                                <Card.Body>
                                    <Card.Title>{item.author}</Card.Title>
                                    <Card.Text>
                                        {item.title}
                                    </Card.Text>
                                    <Button variant="primary">See details</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">New !</small>
                                </Card.Footer>
                            </Card>
                        ))}
                    </CardDeck>

                </Container>
            );
        }
    }
}

export default withCookies(BooksComponent);