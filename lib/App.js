import React from 'react'
import ReactDOM from 'react-dom'
require('./styles.scss')

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
  }

  handleChange(e) {
    this.setState({ location: e.target.value });
  }

  componentWillMount() {
    const local = JSON.parse(localStorage.getItem('weatherInfo'))
    if (!local) return;
    const { location, weather, weatherLocationList } = local
    return this.setState({ location, weather, weatherLocationList })
  }

  submitLocation() {
    const { location, weatherLocationList, weather } = this.state;

    jQuery.getJSON(`https://api.wunderground.com/api/cfa60fe930db844e/forecast/q/${this.state.location}.json`)
      .then((data) => {
        const threeDayForecast = data.forecast.txt_forecast.forecastday

        localStorage.setItem(
          'weatherInfo',
          JSON.stringify({
            location: '',
            weather: [threeDayForecast, ...weather],
            weatherLocationList: [location, ...weatherLocationList]
          })
        )

        this.setState({
          location: '',
          weatherLocationList: [location, ...weatherLocationList],
          weather: [threeDayForecast, ...weather],
        })
      })
  }

  loadList() {
    const forecast = this.state.weather.map((location, i) => {
      return location.map((e, i) => {
        return (
          <li key={ i }>
            <h3>{ e.title }</h3>
            <h4>{ e.fcttext }</h4>
            <br />
          </li>
        )
      })
    });

    return [].concat.apply([], forecast)
  }

  render() {
    return (
      <div>
        <input
          type='number'
          placeholder='Zip Code'
          value={this.state.location}
          onChange={this.handleChange}
        />
        <br />
        <button
          onClick={this.submitLocation}
          disabled={!this.state.location}>Submit</button>
        <ul>{this.loadList()}</ul>
      </div>
    );
  }
}



module.exports = App;
