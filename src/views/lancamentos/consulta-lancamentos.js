import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import LancamentosTable from "./lancamentosTable";

import LancamentoService from "../../service/lancamentoService";
import LocalStorageService from "../../service/localstorageService";
import * as messages from '../../componets/toastr'



class ConsultaLancamentos extends React.Component {

  state = {
    ano: '',
    mes: '',
    tipo: '',
    descricao: '',
    lancamentos: []
  }

  
  constructor(){
    super();
    this.service = new LancamentoService();
  }

  buscar = () => {
    if (!this.state.ano) {
      messages.mensagemErro('o preenchimento do campo ano é obrigatorio')
      return false
    }
    
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')


    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      descricao: this.state.descricao,
      usuario: usuarioLogado.id
    }

    this.service
        .consultar(lancamentoFiltro)
        .then(resposta => {
          this.setState({lancamentos: resposta.data})
        }).catch(error => {
          console.log(error)
        })

  }

  render() {

    const meses = this.service.obterListaMeses()

    const tipos = this.service.obterListaTipos()

    

    return (
      <Card title="Consulta Lancamentos">
        <div className="row">
          <div className="col-lg-6">
            <div className="bs-component">
              <FormGroup label="Ano: *" htmlFor="inputAno">
                <input
                  type="text"
                  className="form-control"
                  id="inputAno"
                  value={this.state.ano}
                  onChange={e => this.setState({ano: e.target.value})}               
                  placeholder="Digite o Ano"/>
              </FormGroup>

              <FormGroup htmlFor="inputMes" label="Mes: *">
                <SelectMenu id="inputMes" 
                            value={this.state.mes}
                            onChange={e => this.setState({mes: e.target.value})}
                            className="form-control" 
                            lista={meses}/>
              </FormGroup>

              <FormGroup label="Descricao: " htmlFor="inputDesc">
                <input
                  type="text"
                  className="form-control"
                  id="inputDesc"
                  value={this.state.descricao}
                  onChange={e => this.setState({descricao: e.target.value})}               
                  placeholder="Digite a descricao"/>
              </FormGroup>

              <FormGroup htmlFor="inputTipo" label="Tipo Lancamentos: *">
                <SelectMenu id="inputTipo"
                            value={this.state.tipo}
                            onChange={e => this.setState({tipo: e.target.value})}
                            className="form-control" 
                            lista={tipos}/>
              </FormGroup>

              <br />

              <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
              <button type="button" className="btn btn-danger">Cadastrar</button>

            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable lancamentos={this.state.lancamentos}/>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(ConsultaLancamentos);
