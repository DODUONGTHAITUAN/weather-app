import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "weather-icons/css/weather-icons.css";

import FormSearch from "../FormSearch/FormSearch";
import { API_KEY, API_CITIES } from "../API/API";
import "./Weather.scss";

class Weather extends React.Component {
    state = {
        data: {},
    };

    getWeather = async ({ country }) => {
        if (country) {
            try {
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${API_KEY}`
                );
                res.status === 200 &&
                    this.setState({
                        data: {
                            city: res.data.name,
                            country: res.data.sys.country,
                            temp: Math.round(res.data.main.temp - 273),
                            tempMin: Math.round(res.data.main.temp_min - 273),
                            tempMax: Math.round(res.data.main.temp_max - 273),
                            desc: res.data.weather[0].description,
                            icon: this.getWeatherIcon(res.data.weather[0].id),
                        },
                    });
                toast.success("Get success!!");
            } catch (error) {
                toast.error("Invalid, please try!!");
            }
        } else {
            toast.warn("Please enter country!!");
        }
    };
    getWeatherIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                return "wi-thunderstorm";
            case rangeId >= 300 && rangeId <= 321:
                return "wi-sleet";
            case rangeId >= 500 && rangeId <= 521:
                return "wi-rain-wind";
            case rangeId >= 600 && rangeId <= 622:
                return "wi-snow";
            case rangeId >= 701 && rangeId <= 781:
                return "wi-fog";
            case rangeId === 800:
                return "wi-day-sunny";
            case rangeId >= 801 && rangeId <= 804:
                return "wi-day-fog";
            default:
                return "";
        }
    };
    getCountries = async () => {
        try {
            const res = await axios.get(API_CITIES);
            const data = res.data.map((item) => {
                return {
                    id: Math.random(),
                    name: item.Country,
                    slug: item.Slug,
                };
            });
            this.props.setCountries(data);
        } catch (error) {
            console.log(error);
        }
    };
    render = () => {
        const { data } = this.state;
        return (
            <div className="weather-app">
                <FormSearch
                    getWeather={this.getWeather}
                    getCountries={this.getCountries}
                />
                {Object.keys(data).length !== 0 && (
                    <div className="weather">
                        <h1 className="weather-heading">
                            {data.city}, {data.country}
                        </h1>
                        <span>
                            <i className={`wi ${data.icon}`}></i>
                        </span>
                        <h2 className="weather-temp">{data.temp}&deg;</h2>
                        <div className="weather-more">
                            <span className="weather-min">
                                {data.tempMin}&deg;
                            </span>
                            <span className="weather-max">
                                {data.tempMax}&deg;
                            </span>
                        </div>
                        <h3 className="weather-desc">
                            {data.desc
                                .split(" ")
                                .map(
                                    (item) =>
                                        `${item[0].toUpperCase()}${item.slice(
                                            1
                                        )}`
                                )
                                .join(" ")}
                        </h3>
                    </div>
                )}
            </div>
        );
    };
}

export default Weather;
