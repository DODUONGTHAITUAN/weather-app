import React from "react";
import { withRouter } from "react-router-dom";
import "./ListCountry.scss";

class ListCountry extends React.Component {
    handleBackPage = () => {
        this.props.history.push("/");
    };

    render = () => {
        const { countries } = this.props;
        return (
            <div className="country">
                <button type="button">Fetch All country</button>
                <ul className="list-country">
                    {countries &&
                        countries.length !== 0 &&
                        countries.map((country, index) => (
                            <li className="country-item" key={country.id}>{`${
                                index + 1
                            } - ${country.name}`}</li>
                        ))}
                </ul>
                <button type="button" onClick={() => this.handleBackPage()}>
                    Back
                </button>
            </div>
        );
    };
}

export default withRouter(ListCountry);
