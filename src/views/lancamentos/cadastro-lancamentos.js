import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import LancamentoService from "../../service/lancamentoService";
import * as messages from '../../componets/toastr'
import LocalStorageSerice from '../../service/localstorageService'



class CadastroLancamentos extends React.Component {

    state = {
      id: null,
      usuario: null,
      descricao: '',
      valor: '',
      mes: '',
      ano: '',
      tipo: '',
      status: '',
      atualizando: false

    }

    submit = () => {

      const usuarioLogado = LocalStorageSerice.obterItem('_usuario_logado')
      
      const {descricao, valor, mes, ano, tipo} = this.state

      const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

      this.service
        .salvar(lancamento)
        .then(response => {
            /*this.props.history.push('/consulta-lancamentos')*/
            this.setState({descricao:'', valor:'', mes:'', ano:'', tipo:''})            
            messages.mensagemSucesso('cadastrado com sucesso!')
        }).catch(error => {
          messages.mensagemErro(error.response.data)
        })

    }

    atualizar = () => {
            
      const {descricao, valor, mes, ano, tipo, id, usuario, status} = this.state
      const lancamento = {descricao, valor, mes, ano, tipo, id, usuario, status}

      this.service
        .atualizar(lancamento)
        .then(response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('atualizado com sucesso!')
        }).catch(error => {
          messages.mensagemErro(error.response.data)
        })

    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }


    componentDidMount(){
      const params = this.props.match.params
      if(params.id){
        this.service.obterPorId(params.id)
            .then(response => {
              this.setState({...response.data, atualizando: true})
            }).catch(erros => {
              messages.mensagemErro(erros.response.data)
            })
      }
    }


    handleChange = (event) => {
      const value = event.target.value
      const name = event.target.name

      this.setState({[name]:value})

    }


  render() {

      const tipos = this.service.obterListaTipos();
      const meses = this.service.obterListaMeses();

    return (
      <Card title={this.state.atualizando ? 'Atualizando Lancamentos' : 'Cadastro de Lancamentos'}>
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputDescricao" label="Descricao: *">
              <input id="inputDescricao" type="text" className="form-control"
                      value={this.state.descricao}
                      name="descricao"
                      onChange={this.handleChange}/>
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <FormGroup id="inputAno" label="Ano: *">
              <input id="inputAno" type="text" className="form-control" 
                      value={this.state.ano}
                      name="ano"
                      onChange={this.handleChange}/>
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputMes" label="Mês: *">
            <SelectMenu id="inputMes" lista={meses} className="form-control"
                        value={this.state.mes}
                        name="mes"
                        onChange={this.handleChange}/>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <FormGroup id="inputValor" label="Valor: *">
              <input id="inputValor" type="text" className="form-control" 
                      value={this.state.valor}
                      name="valor"
                      onChange={this.handleChange}/>
            </FormGroup>
          </div>

          <div className="col-md-2">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu id="inputTipo" lista={tipos} className="form-control"
                          value={this.state.tipo}
                          name="tipo"
                          onChange={this.handleChange}/>
            </FormGroup>
          </div>

          <div className="col-md-2">
            <FormGroup id="inputStatus" label="Status: *">
            <input id="inputValor" type="text" className="form-control" 
                    value={this.state.status}
                    name="status"
                    disabled />
            </FormGroup>
          </div>
        </div>
        <br/>
        {this.state.atualizando ? 
          (<button className="btn btn-primary btn-space" onClick={this.atualizar}>Atualizar</button>)
            :
          (<button className="btn btn-success btn-space" onClick={this.submit}>Salvar</button>)}        
        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-secondary">Cancelar</button>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamentos);
