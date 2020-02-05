import React from 'react';
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Jumbotron from "react-bootstrap/Jumbotron";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class LoginComponent extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = {
            error: null,
            isLoaded: false,
            user: [],
            email: '',
            password: '',
            apiToken: cookies.get('apiToken') || null
        };

        this._login = this._login.bind(this);
        this._setEmail = this._setEmail.bind(this);
        this._setPassword = this._setPassword.bind(this);
    }

    _setEmail(e) {
        let email = e.target.value;

        this.setState(((state, props) => { return {
            email: email
        }}));
    }

    _setPassword(e) {
        let password = e.target.value;

        this.setState(((state, props) => { return {
            password: password
        }}));
    }

    _login() {
        fetch("http://sf5.api.local.wip:8000/api/login", {
            method:"POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                "email":this.state.email,
                "password": this.state.password,
                "_csrf_token": null //@TODO generate csrf token
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const { cookies } = this.props;
                    cookies.set('apiToken',  result.user.apiToken, { path: '/' })

                    this.setState({
                        isLoaded: true,
                        user: result.user,
                    });

                    this.props.history.push('/');
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
        const { error, isLoaded, user } = this.state;

            let alert;
            if (user.error) {
                alert = <Alert variant="danger" dismissible>
                    <Alert.Heading>Auth failed</Alert.Heading>
                    <p>
                        {user.error}
                    </p>
                </Alert>
            }
            return (
                <Container>
                    <Jumbotron>
                        <Alert key="login" variant="info">
                            Please log in
                        </Alert>
                        { alert }
                        <Form>
                            <Form.Group>
                                <FormControl
                                    type="email"
                                    placeholder="email"
                                    aria-label="email"
                                    aria-describedby="basic-addon2"
                                    value={this.state.email}
                                    onChange={this._setEmail}
                                />
                                <FormControl
                                    placeholder="password"
                                    aria-label="password"
                                    aria-describedby="basic-addon2"
                                    value={this.state.password}
                                    onChange={this._setPassword}
                                />
                                <Button variant="primary" onClick={this._login}>OK</Button>
                            </Form.Group>
                        </Form>
                    </Jumbotron>
                </Container>
            );
        }
}

export default withCookies(LoginComponent);