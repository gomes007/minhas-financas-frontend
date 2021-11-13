import React from "react";
import currenciesFormater from 'currency-formatter'

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const rows = props.lancamentos.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>{currenciesFormater.format(lancamento.valor, {locale: 'pt-BR'})}</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td>
        
        <button className="bt btn-success btn-space" title="Efetivar"
                disabled={lancamento.status !== 'PENDENTE'}
                onClick = {e => props.alterarStatus(lancamento, 'EFETIVADO')}
                type="button">
                <i className="pi pi-check"></i>
        </button>

        <button className="bt btn-warning btn-space" title="Cancelar"
                disabled={lancamento.status !== 'PENDENTE'}
                onClick = {e => props.alterarStatus(lancamento, 'CANCELADO')}
                type="button">
                <i className="pi pi-times-circle"></i>
        </button>

        <button type="button" 
                className="btn btn-primary btn-space" title="Editar"
                onClick={e => props.editAction(lancamento.id)}>
                <i className="pi pi-pencil"></i>
        </button>

        <button type="button" 
                className="btn btn-danger btn-space" title="Apagar"
                onClick={e => props.deleteAction(lancamento)}>
                <i className="pi pi-trash"></i>
        </button>
        </td>
      </tr>
    );
  });

    return (
        <table className="table table-hover">
        <thead>
            <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Mes</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
        </table>
  );
};
