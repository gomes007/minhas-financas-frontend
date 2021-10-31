import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import SelectMenu from "../../componets/selectMenu";
import LancamentosTable from "./lancamentosTable";

class ConsultaLancamentos extends React.Component {
  render() {

    const meses = [

        {label: 'Selecione...', value:''},
        {label: 'Janeiro', value: 1},
        {label: 'Fevereiro', value:2},
        {label: 'Março', value:3},
        {label: 'Abril', value:4},
        {label: 'Maio', value:5},
        {label: 'Junho', value:6},
        {label: 'Julho', value:7},
        {label: 'Agosto', value:8},
        {label: 'Setembro', value:9},
        {label: 'Outubro', value:10},
        {label: 'Novembro', value:11},
        {label: 'Dezembro', value:12}
    ]

    const tipos = [
        {label: 'Selecione...', value:''},
        {label: 'Despesa', value: 'DESPESA'},
        {label: 'Receita', value:'RECEITA'}
    ]

    const lancamentos = [
      {id: 1, descricao:'Salário', valor: 5000, mes: 1, tipo: 'Receita', status: 'Efetivado'}
    ]

    return (
      <Card title="Consulta Lancamentos">
        <div className="row">
          <div className="col-lg-6">
            <div className="bs-component">
              <FormGroup label="Ano: *" htmlFor="inputNome">
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  id="inputAno"               
                  placeholder="Digite o Ano"/>
              </FormGroup>

              <FormGroup htmlFor="inputMes" label="Mes: *">
                <SelectMenu id="inputMes" className="form-control" lista={meses}/>
              </FormGroup>

              <FormGroup htmlFor="inputTipo" label="Tipo Lancamentos: *">
                <SelectMenu id="inputTipo" className="form-control" lista={tipos}/>
              </FormGroup>

              <br />

              <button type="button" className="btn btn-success">Buscar</button>
              <button type="button" className="btn btn-danger">Cadastrar</button>

            </div>
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-12">
            <div className="bs-component">
              <LancamentosTable lancamentos={lancamentos}/>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default withRouter(ConsultaLancamentos);
