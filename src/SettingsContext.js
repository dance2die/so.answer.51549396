import React, { Component } from "react";

const defaultValue = {
  currencies: ["Dollar", "Euro", "Won"],
  languages: ["English", "French", "Korean"]
};
const { Provider, Consumer: SettingsConsumer } = React.createContext(
  defaultValue
);

class SettingsProvider extends Component {
  state = {
    languages: [],
    currencies: []
  };
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { SettingsProvider, SettingsConsumer };
