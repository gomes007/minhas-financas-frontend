import ApiService from "./apiservices";

import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService {
  constructor() {
    super("/api/usuarios"); /* apiurl no construtor da apiservices*/
  }

  autenticar(credenciais){
      return this.post('/autenticar', credenciais) /* http://localhost:8080/api/usuarios/autenticar */
  }

  obterSaldoPorUsuario(id){
    return this.get(`/${id}/saldo`)
  }

  salvar(usuario){
    return this.post('/', usuario)
  }

  validar(usuario){
    const erros = []

      if (!usuario.nome) {
          erros.push('campo nao obrigatorio')
      }

      if (!usuario.email) {
        erros.push('campo obrigatorio')
      } else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
        erros.push('informe email valido')
      }

      if (!usuario.senha || !usuario.senhaRepeticao) {
        erros.push('digite a senha 2x')
      } else if (usuario.senha !== usuario.senhaRepeticao) {
        erros.push('as senhas não batem')
      }

      if (erros && erros.length > 0) {
        throw new ErroValidacao(erros);
      }
  }


}

export default UsuarioService;

