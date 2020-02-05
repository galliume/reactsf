import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";

class BooksComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            search:'',
        };

        this._books = this._books.bind(this);
        this._setSearch = this._setSearch.bind(this);
    }


    componentDidMount() {
        this._books(this.state.search)
    }

    componentWillUnmount() {
        if (this._books) {
            this._books.cancel();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.search !== prevState.search) {
            this._books();
        }
    }

    _books() {

        fetch("http://sf5.api.local.wip:8000/api/books?search="+this.state.search, {
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

    _setSearch(e) {
        let search = e.target.value;

        this.setState(((state, props) => { return {
            search: search
        }}));
    }

    render() {
        const { error, isLoaded, items, search } = this.state;

        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <Container>

                    <Form inline>
                        <FormControl name="search" type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={this._setSearch}/>
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

export default BooksComponent;