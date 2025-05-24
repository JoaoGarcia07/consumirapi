import React, { Component } from "react";
import api from "./api";

class App extends Component {
  state = {
    filmes: [],
    query: ''
  };

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  };

  fetchFimes = async (query) => {
    try {
      const response = await api.get(query);
      this.setState({ filmes: response.data });
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { query } = this.state;
    this.fetchFimes(query);
  };

  render() {
    const { filmes } = this.state;
    return (
      <div className="listar-os-filmes">
        <h1>Listar os Filmes</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Digite o nome do filme"
          />
          <button type="submit">Buscar</button>
        </form>
        <ul>
          {filmes.map((filme) => (
            <li key={filme.show.id}>
              <h2>
                <strong>Título:</strong> {filme.show.name}
              </h2>
              <p>
                <a href={filme.show.url}>Link do Filme</a>
              </p>
              <img src={filme.show.image?.medium} alt="Capa Filme" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
