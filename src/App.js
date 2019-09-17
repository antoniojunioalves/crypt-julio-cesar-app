import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    jsonInicial: {
      numero_casas: 4,
      token: "64303698a48effb62677752107150d355a274937",
      cifrado: "Antonio junio1",
      // cifrado: "izir xli fiwx tperrmrk mw rsx ws sqrmwgmirx ew xs kix mx vmklx xli jmvwx xmqi. jvih fvssow",
      decifrado: "Não implementado ainda",
      resumo_criptografico: ""
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  descifrarLetra(letra, qtdCasas) {
    let posicDecript = letra.charCodeAt()
    posicDecript += qtdCasas
    posicDecript = posicDecript > 122 ? (posicDecript - 123 + 97) : posicDecript

    return String.fromCharCode(posicDecript)
  }

  decifrarTexto(jsonInicial) {
    let { cifrado, numero_casas } = jsonInicial
    cifrado = cifrado.toLowerCase()

    var decifrado = '';
    console.log('qtd', numero_casas)
    for (let i = 0; i <= cifrado.length - 1; i++) {
      console.log('Criptografado: ', cifrado[i])
      console.log('Decriptografado: ', this.descifrarLetra(cifrado[i], numero_casas))

      decifrado += this.isNumber(cifrado[i]) ? cifrado[i] : this.descifrarLetra(cifrado[i], numero_casas)
    }

    console.log(decifrado)
  }

  componentDidMount() {
    this.decifrarTexto(this.state.jsonInicial)

    fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
      .then(response => {
        if (!response.ok)
          throw new Error()

        return response.json()
      })
      // .then(response => {
      //   this.setState({ ...this.state, jsonInicial: response })
      //   this.decifrarTexto(response)
      // })
      .then(response => console.log(response))
      .catch((error) => console.log('3', error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Criptografia de Júlio César - Quantidade de casas({this.state.numero_casas})
          </p>
          <p>
            {this.state.jsonInicial.cifrado}
          </p>
          <p>
            {this.state.jsonInicial.decifrado}
          </p>

        </header>
      </div>
    )
  }
}

export default App;
