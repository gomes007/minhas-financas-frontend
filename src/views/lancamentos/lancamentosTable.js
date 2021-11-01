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
        <td></td>
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
