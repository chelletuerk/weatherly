import React from 'react';
import ThreeDayForecast from './ThreeDayForecast';
import Controls from './Controls';
require('./styles.scss');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      weatherLocationList: [],
      weather: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLocation = this.submitLocation.bind(this);
    this.clearDOM = this.clearDOM.bind(this);
  }

  handleChange(e) {
    const location = e.target.value;
    if (location.length > 5) return;
    this.setState({ location });
  }

  componentWillMount() {
    const local = JSON.parse(localStorage.getItem('weatherInfo'));
    if (!local) return;
    const { location, weather, weatherLocationList } = local;
    return this.setState({ location, weather, weatherLocationList });
  }

  submitLocation() {
    const { location, weatherLocationList, weather } = this.state;
    const url = 'https://api.wunderground.com/api/cfa60fe930db844e/forecast/q/';
  jQuery.getJSON(`${url}${this.state.location}.json`)
      .success((data) => {
        if (!data.forecast) {
          this.setState({ location: '' });
          return alert('INVALID ZIP CODE');
        }

        const threeDayForecast = data.forecast.txt_forecast.forecastday;

        localStorage.setItem(
          'weatherInfo',
          JSON.stringify({
            location: '',
            weather: [threeDayForecast],
            weatherLocationList: [location, ...weatherLocationList],
          })
        );

        this.setState({
          location: '',
          weatherLocationList: [location, ...weatherLocationList],
          weather: [threeDayForecast],
        });
      });
  }

  clearDOM() {
    this.setState({ weather: [] });
    this.clearLocalStorage();
  }

  clearLocalStorage() {
    window.localStorage.clear();
  }

  render() {
    return (
      <div>
        <h1>weathrly</h1>
        <h2>weather...<br/>you like it, or not</h2>
        <Controls location={this.state.location}
          handleChange={this.handleChange}
          submitLocation={this.submitLocation}
          clearDOM={this.clearDOM}/>
        <ThreeDayForecast weather={this.state.weather[0]}/>
      </div>
    );
  }
}

module.exports = App;
