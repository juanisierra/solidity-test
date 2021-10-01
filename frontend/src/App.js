import logo from "./logo.svg";
import "./App.css";
import web3 from './web3';
import lottery from './lottery';
import React from "react";

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  enterLottery = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction...'});
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been entered'});
  };

  pickWinner = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ winnerMessage: 'Picking a winner...'});
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ winnerMessage: 'A winner has been picked'});
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager} </p>
        <p>There are currently {this.state.players.length} players in the game </p>
        <p>The prize is {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>
        <hr/>
        <form
        onSubmit = {this.enterLottery}
        >
        <h4> Want to try your luck?</h4>
        <div>
        <label>Amount of ether to enter</label>
        <input
        onChange = {event => this.setState({ value: event.target.value })}
        value = {this.state.value}
        />
        </div>
        <button>Enter</button>
        </form>

        <hr/>
        <p>{this.state.message}</p>
        <hr />
        <form
        onSubmit = {this.pickWinner}
        >
        <h4>Pick a winner!</h4>
        <button>Play</button>
        </form>
        <p>{this.state.winnerMessage}</p>
      </div>
    );
  }
}
export default App;
