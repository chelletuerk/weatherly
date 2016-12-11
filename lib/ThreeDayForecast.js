import React from 'react'

class ThreeDayForecast extends React.Component {
  constructor() {
    super()
  }

  loadThreeDay() {
    return this.props.threeDayForecast.map((e, i) => {
      return (
        <ul key={ i }>
          <li>
            <img src={e.icon_url} />
            <h3>{ e.title }</h3>
            <h4>{ e.fcttext }</h4>
          </li>
        </ul>
      )
    })
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
