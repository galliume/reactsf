import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import { withCookies } from 'react-cookie';

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
        //let authToken = Cookies.get("authToken");
        let headerObj = {'x-auth-token': "authToken"};

        fetch("http://sf5.api.local.wip:8000/books")
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
            );
        }
    }
}

export default withCookies(BooksComponent);