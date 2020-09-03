import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import Login from '../../pages/login/index';
import Layouts from "../../components/Layouts";
import functions from "../../utils/functions.js"
import models from "../../utils/models";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props => models.Init({ component: Component, ...rest })
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }} />
        }
    />
);

const render = function() {
    return <Layouts routes={
        functions.modules(
            require.context('../moudels', true)
        ).map(
            (item, key) => <PrivateRoute exact key={ key } { ...item } />
        )
    } />
};
const routerList = [
    {
        name: 'login',
        path: '/login',
        exact: true,
        component: Login
    },
    {
        name: 'home',
        path: '/',
        render
    }
];
export {routerList}
