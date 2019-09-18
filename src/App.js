import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    jsonInicial: {
      numero_casas: 4,
      token: "64303698a48effb62677752107150d355a274937",
      cifrado: "Antonio1",
      // cifrado: "izir xli fiwx tperrmrk mw rsx ws sqrmwgmirx ew xs kix mx vmklx xli jmvwx xmqi. jvih fvssow",
      decifrado: "Não implementado ainda",
      resumo_criptografico: ""
    }
  }

  criptografa(letra, qtdCasas) {
    const codigoTabelaAscii = letra.charCodeAt()
    // Código tabela ascii 97 = a; 98 = b; 99 = c; ...122 = z
    if (97 <= codigoTabelaAscii && codigoTabelaAscii <= 122) {

      let letraDeslocada = codigoTabelaAscii + qtdCasas

      letraDeslocada = letraDeslocada > 122 ? (letraDeslocada - 123 + 97) : letraDeslocada

      return String.fromCharCode(letraDeslocada)
    } else {
      return letra
    }
  }

  decifrarTexto(jsonInicial) {
    let { cifrado, numero_casas } = jsonInicial
    cifrado = cifrado.toLowerCase()
    var decifrado = '';

    decifrado = Array.from(cifrado)
      .reduce((acumulado, letra) => {
        console.log(this.criptografa(letra, numero_casas))
        acumulado += this.criptografa(letra, numero_casas)
        return acumulado
      }, '')

    // for (let i = 0; i <= cifrado.length - 1; i++) {
    //   decifrado += this.criptografa(cifrado[i], numero_casas)
    // }

    console.log(decifrado)

    return decifrado
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
