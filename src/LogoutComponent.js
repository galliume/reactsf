import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class LogoutComponent extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentDidMount() {
        this._logout();
    }

    _logout() {
        fetch("http://sf5.api.local.wip:8000/logout", {
            method:"GET"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const { cookies } = this.props;
                    cookies.remove("apiToken");
                    cookies.remove("userName");

                    this.props.history.push('/');
                },
                (error) => {

                }
            )
    }

    render() {
        return null;
    }
}

export default withCookies(LogoutComponent);