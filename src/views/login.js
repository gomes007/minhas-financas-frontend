import React from "react";
import Card from "../componets/card";
import FormGroup from "../componets/form-group";
import {withRouter} from 'react-router-dom'

import UsuarioService from "../service/usuarioService";

import {mensagemErro} from '../componets/toastr';

import { AuthContext } from "../main/provedorAutenticacao";



class Login extends React.Component {

  state = {

    email: '',
    senha: ''

  }

  constructor(){
    super();
    this.service = new UsuarioService();
  }

  entrar = () => {
    this.service.autenticar({
        email: this.state.email,
        senha: this.state.senha
    }).then(response => {        
        this.context.iniciarSessao(response.data)
        this.props.history.push('/home')
    }).catch(erro => {
        mensagemErro(erro.response.data)
    })


  }


  prepareCadastrar = () => {
    this.props.history.push('/cadastro-usuarios')
  }


  render() {
    return (
      
        <div className="row">
          <div
            className="col-md-6"
            style={{ position: "relative", left: "300px" }}>
            <Card title="Login">
              <div className="row">
                <div className="row"></div>
                <div className="col-lg-12">
                  <div className="bs-component">
                    <fieldset>
                      <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                        <input type="email" 
                                value={this.state.email}
                                onChange={e=> this.setState({email: e.target.value})}
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp" 
                                placeholder="Digite o Email"/>
                      </FormGroup>
                      <FormGroup label="Senha *" htmlFor="">
                        <input type="password" 
                                value={this.state.senha}
                                onChange={e=> this.setState({senha: e.target.value})}
                                className="form-control" 
                                id="exampleInputPassword1" 
                                placeholder="Password"/>
                      </FormGroup>
                      <br/>
                      <button onClick={this.entrar} type="button" className="btn btn-success btn-space">Entrar</button>
                      <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger">Cadastrar</button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      
    )
  }
}

Login.contextType = AuthContext

export default withRouter(Login)
