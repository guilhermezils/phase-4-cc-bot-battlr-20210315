import React, { Component } from "react";
import BotCollection from '../containers/BotCollection'
import YourBotArmy from '../containers/YourBotArmy'
const botUrl = 'http://localhost:6001/bots'

class BotsPage extends Component {
  state = {
    bots: [],
  };

  componentDidMount() {
    fetch(botUrl)
      .then((res) => res.json())
      .then((bots) => this.setState({ bots }));
  }
  myArmy = (bot) => {
    const newBot = { ...bot, enlisted: true };
    this.setState({ bots: this.state.bots.map((b) => (b === bot ? newBot : b)) });
  };
  removeBot = (bot) => {
    const newBot = { ...bot, enlisted: false };
    this.setState({ bots: this.state.bots.map((b) => (b === bot ? newBot : b)) });
  }
  deleteBot = (bot) => {
    fetch(`http://localhost:6001/bots/${bot.id}`, {
      method: 'DELETE',
    })
    .then(() =>
    this.setState({
      bots: [...this.state.bots.filter((b) => b !== bot)],
    })
    );
  };
  render() {
    return (
      <div>
        <YourBotArmy 
        handleClick={this.removeBot} 
        handleDelete={this.deleteBot} 
        bots={this.state.bots.filter((bot) => bot.enlisted)} />
        <BotCollection 
        handleClick={this.myArmy} 
        handleDelete={this.deleteBot} 
        bots={this.state.bots} />
      </div>
    );
  }
}
export default BotsPage;