import ApiService from "./apiservices";

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


}

export default UsuarioService;

