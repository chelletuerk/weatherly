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

  submitLocation() {
    const { location, weatherLocationList, weather } = this.state;
    jQuery.getJSON(`https://api.wunderground.com/api/cfa60fe930db844e/forecast/q/${this.state.location}.json`)
    .then(function(data) {
      console.log(data)
        let newWeather = data.forecast.txt_forecast.forecastday[0].fcttext
        if (!weather) {
          alert('Invalid Zip Code');
        }
        // localStorage.setItem('newWeather')
        this.setState({
          location: '',
          weatherLocationList: [location, ...weatherLocationList],
          weather: [newWeather, ...weather] });
    }.bind(this))
  }

  loadList() {
    return this.state.weatherLocationList.map((location, i) => {
      return (<li key={ i }>{ location }<br />{ this.state.weather[i] }</li>);
    });
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
