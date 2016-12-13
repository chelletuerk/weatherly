import React from 'react'

export default class Controls extends React.Component {
  constructor() {
    super()
  }

  render() {
    let {location, handleChange, submitLocation, clearDOM} = this.props;
    return (
      <div>
        <input
          type='number'
          placeholder='Zip Code'
          value={location}
          onChange={handleChange}
        />
        <br />
        <button
          onClick={submitLocation}
          disabled={!location}>Submit</button>
        <button
          id='clear'
          onClick={clearDOM}>Clear</button>
      </div>
    )
  }
}
