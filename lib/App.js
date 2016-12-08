const React = require('react');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      list: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ location: e.target.value });
  }

  handleClick() {
    const { location, list } = this.state;
    this.setState({ location: '', list: [location, ...list] });
  }

  loadList() {
    return this.state.list.map((location, i) => {
      return (<li key={ i }>{ location }</li>);
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.location}
          onChange={this.handleChange}
        />
        <br />
        <button
          onClick={this.handleClick}
          disabled={!this.state.location}>Search by Location</button>
        <ul>{this.loadList()}</ul>
      </div>
    );
  }
}


module.exports = App;
