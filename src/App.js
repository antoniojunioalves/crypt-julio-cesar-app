import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    jsonInicial: {}
  }

  componentDidMount() {
    fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
      .then(response => {
        if (!response.ok)
          throw new Error()

        return response.json()
      })
      // .then(response => this.setState({ ...this.state, jsonInicial: response }))
      .then(response => console.log(response))
      .catch((error) => console.log('3', error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Criptografia de Júlio César
          </p>
          <div>
            {this.state.jsonInicial.map(j => { <p>{j.cifrado}</p> })}
          </div>
          <p>
            Texto decifrado
        </p>

        </header>
      </div>
    )
  }
}

export default App;
