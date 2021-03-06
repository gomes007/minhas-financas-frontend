import React from "react";
import Card from "../componets/card";
import FormGroup from "../componets/form-group";
import { withRouter } from "react-router-dom";
import UsuarioService from "../service/usuarioService";
import { mensagemSucesso, mensagemErro } from "../componets/toastr";

class CadastroUsuario extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  cadastrar = () => {

    const { nome, email, senha, senhaRepeticao } = this.state;
    const usuario = { nome, email, senha, senhaRepeticao };

    try {
      this.service.validar(usuario)
    } catch (error) {
      const mensagens = error.mensagens
      mensagens.forEach(msg => mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(usuario)
      .then((response) => {
        mensagemSucesso(
          "Usuario cadastrado com sucesso! faça login para acessar o sistema."
        );
        this.props.history.push("/login");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  cancelar = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Card title="Cadastro de Usuario">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  name="nome"
                  className="form-control"
                  onChange={(e) => this.setState({ nome: e.target.value })}
                  placeholder="Digite o Nome"
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder="Digite o Email"
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  name="senha"
                  className="form-control"
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />
              </FormGroup>
              <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                <input
                  type="password"
                  id="inputRepitaSenha"
                  name="repitaSenha"
                  className="form-control"
                  onChange={(e) =>
                    this.setState({ senhaRepeticao: e.target.value })
                  }
                />
              </FormGroup>
              <button
                onClick={this.cadastrar}
                type="button"
                className="btn btn-success"
              >
                Salvar
              </button>
              <button
                onClick={this.cancelar}
                type="button"
                className="btn btn-danger"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
