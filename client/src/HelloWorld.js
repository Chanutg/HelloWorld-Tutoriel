import React from "react";
import Button from 'react-bootstrap/Button';

class HelloWorld extends React.Component {
  state = { sentence: null, newSentence: "", stackId: null };

  changeSentence = e => {
      this.setState({newSentence: e.target.value});
  }

  makeTransaction = () => {
      const { drizzle, drizzleState } = this.props;
      const helloWorld = drizzle.contracts.HelloWorld;

      helloWorld.methods["changeSentence"].cacheSend(this.state.newSentence, { from: drizzleState.accounts[0], gas:3000000});
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const helloWorld = drizzle.contracts.HelloWorld;

    const sentence = helloWorld.methods["saySomething"].cacheCall({ from: drizzleState.accounts[0], gas:3000000});

    this.setState({ sentence });
  }

  render() {
    const { HelloWorld } = this.props.drizzleState.contracts;

    return (
        <div>
           <p>Sentence : {HelloWorld.saySomething[this.state.sentence] && HelloWorld.saySomething[this.state.sentence].value}</p>
           <input type="text" value={this.state.newSentence} onChange={this.changeSentence}/>
           <Button variant="outline-dark" type="submit" value="Submit" onClick={this.makeTransaction}>Send</Button>
        </div>
    );
  }
}

export default HelloWorld;
