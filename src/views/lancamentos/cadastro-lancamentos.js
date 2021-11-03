import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import LancamentoService from "../../service/lancamentoService";
import currenciesFormater from 'currency-formatter';


class CadastroLancamentos extends React.Component {

    constructor(){
        super();
        this.service = new LancamentoService();
    }

  render() {

      const tipos = this.service.obterListaTipos();
      const meses = this.service.obterListaMeses();

    return (
      <Card title="Cadastro de Lancamentos">
        <div className="row">
          <div className="col-md-6">
            <FormGroup id="inputDescricao" label="Descricao: *">
              <input id="inputDescricao" type="text" className="form-control" />
            </FormGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-md-1">
            <FormGroup id="inputAno" label="Ano: *">
              <input id="inputAno" type="text" className="form-control" />
            </FormGroup>
          </div>
          <div className="col-md-3">
            <FormGroup id="inputMes" label="Mês: *">
            <SelectMenu id="inputMes" lista={meses} className="form-control"/>
            </FormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <FormGroup id="inputValor" label="Valor: *">
              <input id="inputValor" type="text" className="form-control" />
            </FormGroup>
          </div>

          <div className="col-md-2">
            <FormGroup id="inputTipo" label="Tipo: *">
              <SelectMenu id="inputTipo" lista={tipos} className="form-control"/>
            </FormGroup>
          </div>

          <div className="col-md-2">
            <FormGroup id="inputStatus" label="Status: *">
            <input id="inputValor" type="text" className="form-control" disabled />
            </FormGroup>
          </div>
        </div>
        <br/>
        <button className="btn btn-success btn-space">Salvar</button>
        <button className="btn btn-secondary">Cancelar</button>
      </Card>
    );
  }
}

export default withRouter(CadastroLancamentos);
