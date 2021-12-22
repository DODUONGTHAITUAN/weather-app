import React from "react";
import { withRouter } from "react-router-dom";
import "./FormSearch.scss";

class FormSearch extends React.Component {
    state = {
        country: "",
    };
    handleOnchange = (e) => {
        this.setState({
            ...this.state,
            country: e.target.value,
        });
    };
    handleSearch = (e) => {
        e.preventDefault();
        this.props.getWeather({
            country: this.state.country.trim(),
        });
        this.setState({
            country: "",
        });
    };
    handleFindCountry = (e) => {
        e.preventDefault();
        this.props.getCountries();
        this.props.history.push("/country");
    };
    render = () => {
        const { country } = this.state;
        return (
            <div className="form">
                <input
                    type="text"
                    placeholder="City or Country"
                    className="form-input"
                    value={country}
                    onChange={(e) => this.handleOnchange(e)}
                    onKeyUp={(e) => {
                        e.keyCode === 13 && this.handleSearch(e);
                    }}
                />
                <button
                    type="button"
                    className="form-btn"
                    onClick={(e) => this.handleSearch(e)}
                >
                    Search
                </button>
                <button
                    type="button"
                    className="form-btn"
                    style={{ marginLeft: "20px" }}
                    onClick={(e) => this.handleFindCountry(e)}
                >
                    Find country
                </button>
            </div>
        );
    };
}

export default withRouter(FormSearch);
