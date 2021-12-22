import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "./logo.svg";
import "./App.scss";
import Weather from "./components/Weather/Weather";
import Nav from "./components/Nav/Nav";
import ListCountry from "./components/Countries/ListCountry";

class App extends React.Component {
    state = {
        countries: [],
    };
    setCountries = (data) => {
        this.setState({
            ...this.state,
            countries: [...data],
        });
    };
    render = () => {
        const { countries } = this.state;
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Nav />
                        <img src={logo} className="App-logo" alt="logo" />
                        <Switch>
                            <Route path="/" exact>
                                <Weather setCountries={this.setCountries} />
                            </Route>
                            <Route>
                                <ListCountry countries={countries} />
                            </Route>
                        </Switch>
                    </header>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable
                        pauseOnHover
                    />
                </div>
            </Router>
        );
    };
}

export default App;
