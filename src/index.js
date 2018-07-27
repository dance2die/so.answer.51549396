import React, { Component } from "react";
import ReactDOM from "react-dom";

import { SettingsProvider, SettingsConsumer } from "./SettingsContext";

import "./styles.css";

class Settings extends Component {
  state = {
    languages: [],
    currencies: []
  };
  getSettings = () => {
    // fetch('/settings', {
    //     method: 'get',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then( ... )
    // .then(json => {
    //     this.setState({
    //         currencies: json.currencies,
    //         languages: json.languages
    //     });
    // })
    this.setState({
      currencies: ["Dollar", "Euro", "Won"],
      languages: ["English", "French", "Korean"]
    });
  };

  componentDidMount() {
    this.getSettings();
  }

  render() {
    return <div>{this.props.children(this.state)}</div>;
  }
}

const renderComponents = (currencies, languages) => {
  const currencyItems = currencies.map(currency => (
    <li key={currency}>{currency}</li>
  ));
  const languageItems = languages.map(language => (
    <li key={language}>{language}</li>
  ));
  return (
    <div>
      <h3>currencies</h3>
      <ul>{currencyItems}</ul>
      <hr />
      <h3>languages</h3>
      <ul>{languageItems}</ul>
    </div>
  );
};

const AppChildAsFunction = () => (
  <div>
    <h2>Using Child as Function</h2>
    <Settings>
      {({ currencies, languages }) => renderComponents(currencies, languages)}
    </Settings>
  </div>
);

const AppWithContext = () => (
  <div>
    <h2>Using Context API</h2>
    <SettingsConsumer>
      {({ currencies, languages }) => renderComponents(currencies, languages)}
    </SettingsConsumer>
  </div>
);

class App extends Component {
  state = { useContextProvider: true };
  handleClick = e => {
    this.setState(prevState => ({
      useContextProvider: !prevState.useContextProvider
    }));
  };
  render() {
    const { useContextProvider } = this.state;

    return (
      <div>
        Check to use{" "}
        {useContextProvider ? `Child as Function` : `Context Provider`}
        <input
          type="checkbox"
          checked={useContextProvider}
          onChange={this.handleClick}
        />
        {useContextProvider ? <AppWithContext /> : <AppChildAsFunction />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
