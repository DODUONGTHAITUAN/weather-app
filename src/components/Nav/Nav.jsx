import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.scss";

class Nav extends React.Component {
    render = () => {
        return (
            <div className="topnav">
                <NavLink to="/" activeClassName="active" exact={true}>
                    Weather
                </NavLink>
                <NavLink to="/country">Country</NavLink>
            </div>
        );
    };
}

export default Nav;
