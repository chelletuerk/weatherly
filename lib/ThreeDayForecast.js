import React from 'react'

class ThreeDayForecast extends React.Component {
  constructor() {
    super(),
    this.state = {
      weekArray: [],
    }
  }

  loadThreeDay() {
    let tempArray = [];
    if(this.props.weather){
    this.props.weather.map((e, i) => {
      tempArray.push(
        <ul key={ i }>
          <li>
            <img src={e.icon_url} className='image' />
            <h3>{ e.title }</h3>
            <h4>{ e.fcttext }</h4>
          </li>
        </ul>
      )
    })}
    return tempArray;
  }

  render() {
    return (
      <div>
        {this.loadThreeDay()}
      </div>
    )
  }
}

module.exports = ThreeDayForecast
