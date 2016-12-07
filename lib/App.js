const React = require('react');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wow: 'WOW',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ wow: 'OK' });
  }

  render() {
    return (
      <div>
        <h1>{this.state.wow}</h1>
        <button
          className="change-button"
          onClick={this.handleClick}
        >
         Change To OK!
        </button>
      </div>
    );
  }
}

module.exports = App;
