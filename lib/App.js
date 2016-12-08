const React = require('react');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: '',
      list: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ city: e.target.value });
  }

  handleClick() {
    const { city, list } = this.state;
    this.setState({ city: '', list: [city, ...list] });
  }

  loadList() {
    return this.state.list.map((city, i) => {
      return (<li key={ i }>{ city }</li>);
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.city}
          onChange={this.handleChange}
        />
        <br />
        <button onClick={this.handleClick}>Search by City</button>
        <ul>{this.loadList()}</ul>
      </div>
    );
  }
}


module.exports = App;
