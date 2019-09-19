import React, { Component } from 'react'
import './App.css'
import sha1 from 'sha1'

class App extends Component {
  state = {
    answer: {
      numero_casas: 0,
      token: '',
      cifrado: '',
      decifrado: '',
      resumo_criptografico: ''
    }
  }

  criptografar(letra, qtdCasas) {
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

  decriptografar(letra, qtdCasas) {
    const codigoTabelaAscii = letra.charCodeAt()
    // Código tabela ascii 97 = a; 98 = b; 99 = c; ...122 = z
    if (97 <= codigoTabelaAscii && codigoTabelaAscii <= 122) {

      let letraDeslocada = codigoTabelaAscii - qtdCasas

      letraDeslocada = letraDeslocada < 97 ? (letraDeslocada + 25) : letraDeslocada

      return String.fromCharCode(letraDeslocada)
    } else {
      return letra
    }
  }

  decifrarTexto(answer, criptografar = true) {
    let { cifrado, numero_casas } = answer
    cifrado = cifrado.toLowerCase()

    // if (criptografar) {
    //   return Array.from(cifrado)
    //     .reduce((acumulado, letra) => {
    //       acumulado += this.criptografar(letra, numero_casas)
    //       return acumulado
    //     }, '')
    // } else {
    //   return Array.from(cifrado)
    //     .reduce((acumulado, letra) => {
    //       acumulado += this.decriptografar(letra, numero_casas)
    //       return acumulado
    //     }, '')
    // }

    let decifrado = ''
    if (criptografar) {
      for (let i = 0; i <= cifrado.length - 1; i++) {
        decifrado += this.criptografar(cifrado[i], numero_casas)
      }
    } else {
      for (let i = 0; i <= cifrado.length - 1; i++) {
        decifrado += this.decriptografar(cifrado[i], numero_casas)
      }
    }

    return decifrado
  }

  componentDidMount() {
    // fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=64303698a48effb62677752107150d355a274937')
    fetch('http://localhost:4001/buscarJSON')
      .then(response => {
        if (!response.ok)
          throw new Error()

        return response.json()
      })
      .then(response => {
        let { answer } = this.state
        answer = response
        localStorage.setItem('answer', JSON.stringify(answer));

        this.setState({ ...this.state, answer })
        const decifrado = this.decifrarTexto(answer, false)
        const resumo_criptografico = sha1(decifrado)
        answer = { ...answer, decifrado, resumo_criptografico }
        this.setState({ ...this.state, answer })
      })
      .catch((error) => console.log('3', error))
  }

  enviarJSON(answer) {
    fetch('http://localhost:4001/encaminharJSON', {
      method: 'post',
      body: JSON.stringify(answer),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => console.log(res))
      // .then(json => console.log(json))
      .catch((error) => console.log('4', error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Criptografia de Júlio César - Quantidade de casas({this.state.answer.numero_casas})
          </p>
          <div>
            <p>Texto Original</p>
            {this.state.answer.cifrado}
          </div>
          <div>
            <p>Texto Criptografado</p>
            {this.state.answer.decifrado}
          </div>

          <div>
            <p>sha1</p>
            {this.state.answer.resumo_criptografico}
          </div>
          <button onClick={() => console.log(this.decifrarTexto(this.state.answer))}>
            Criptografar
          </button>
          <button onClick={() => console.log(this.decifrarTexto(this.state.answer, false))}>
            Decriptgrafar
          </button>
          <button onClick={() => console.log(this.enviarJSON(this.state.answer))}>
            Enviar JSON
          </button>

        </header>
      </div>
    )
  }
}

export default App;
