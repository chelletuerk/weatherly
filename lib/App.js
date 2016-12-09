import React from 'react'
import ReactDOM from 'react-dom'

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
    jQuery.getJSON(`http://api.wunderground.com/api/cfa60fe930db844e/forecast/q/CO/${this.state.location}.json`)
    .then(function(data) {
        let newWeather = data.forecast.txt_forecast.forecastday[0].fcttext
        this.setState({ location: '', weatherLocationList: [location, ...weatherLocationList], weather: [newWeather, ...weather] });
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
          placeholder='Location'
          value={this.state.location}
          onChange={this.handleChange}
        />
        <br />
        <button
          onClick={this.submitLocation}
          disabled={!this.state.location}>Search by Location</button>
        <ul>{this.loadList()}</ul>
      </div>
    );
  }
}



module.exports = App;
