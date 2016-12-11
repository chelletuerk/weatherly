import React from 'react'
import ThreeDayForecast from './ThreeDayForecast'
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
    const location = e.target.value
    if (location.length > 5) return;
    return this.setState({ location });
  }

  componentWillMount() {
    const local = JSON.parse(localStorage.getItem('weatherInfo'))
    if (!local) return;
    const { location, weather, weatherLocationList } = local
    return this.setState({ location, weather, weatherLocationList })
  }

  submitLocation() {
    const { location, weatherLocationList, weather } = this.state;
    const url = 'https://api.wunderground.com/api/cfa60fe930db844e/forecast/q/'

    jQuery.getJSON(`${url}${this.state.location}.json`)
      .success((data) => {
        if (!data.forecast) {
          this.setState({ location: '' })
          return alert("INVALID ZIP CODE BOOGIEZ")
        }

        const threeDayForecast = data.forecast.txt_forecast.forecastday

        localStorage.setItem(
          'weatherInfo',
          JSON.stringify({
            location: '',
            weather: [[threeDayForecast, ...weather][0]],
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
    return this.state.weather.map((threeDayForecast, i) => {
      return (
        <div key={i}>
          <h1 className="code">{this.state.weatherLocationList[i]}</h1>
          <hr/>
          <ThreeDayForecast threeDayForecast={threeDayForecast} />
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <h1>weathrly</h1>
        <h2>weather...<br/>you like it, or not</h2>
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
        {this.loadList()}
      </div>
    );
  }
}



module.exports = App;
