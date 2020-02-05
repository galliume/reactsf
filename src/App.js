import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

import './App.css';
import BooksComponent from "./BooksComponent";

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            apiToken: cookies.get('apiToken') || null
        };
    }

    componentDidMount() {
        if (null == this.state.apiToken) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (null == this.state.apiToken) {
            this.props.history.push('/login');
        }
    }

    render() {
        let bookComponent =  (null !== this.state.apiToken) ? <BooksComponent/> : null;
        return (
            <Container className="p-3">
                <Jumbotron>
                    <h1>BookSwap : swap locally your books</h1>
                </Jumbotron>
                { bookComponent }
            </Container>
        );
    }
}

export default withCookies(App);
