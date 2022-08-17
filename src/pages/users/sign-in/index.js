import React,{useState, useEffect} from 'react'
import './style.css'
import "../../../global.css"
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import Usuarios from '../../../server/usuario.json'
import { confirmAlert } from 'react-confirm-alert'; 
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../../../components/head/react-confirm-alert.css'
export default function SignIn(){
    
    const history =  useHistory();
    const [nome, setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [confSenha,setConfSenha] = useState('');
    const [valida, setValida] = useState(true);
    const [msg, setMsg] = useState('');
    const [usu, setUsu] = useState('');
    
    // const dados=[
    //     {
    //     id:1,
    //     email:email,
    //     nome:nome,  
    //     senha:senha
    //   }
    // ]
    function validarSenha(){
        if (senha!==""){
          if(senha!==confSenha){
            setValida(false)
            setMsg("Senhas NÃO conferem!")
          }else{
            setValida(true)
            setMsg("Senhas conferem!")
          }
        }else{
          setValida(false)
          setMsg("Digite uma senha!")
          setTimeout(() => {
            setMsg("")
          }, 4000);
        }
      }
      function salvarDados(e){
        e.preventDefault();
        validarSenha();
        if (valida === false){
          setMsg("Cadastro falhou, tente novamente")
        }else {
          let index=0;
          if(nome.length<=3){
            setMsg("O Nome precisa ter acima de 3 caracteres.")
            index++
          } else if(email===""){
            setMsg("O Email está vazio!")
            index++
          }
          if (index===0){
            let listaUser = JSON.parse(localStorage.getItem("cd-usuarios")||"[]")
            listaUser.push(
                {
                    id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                    email:email,
                    nome:nome,  
                    senha:senha
                }
            )
            localStorage.setItem("cd-usuarios",JSON.stringify(listaUser))
            alert("Cadastro realizado!")
            window.location.href="/userlist"

            // let novodados=[];
            // let cadastros=[];
            // if (localStorage.getItem("cd-usuarios")==undefined){
            //     localStorage.setItem("cd-usuarios",JSON.stringify(dados))
            //     alert("Cadastro realizado!")
            // } else{
            //     cadastros = localStorage.getItem("cd-usuarios");
            // }
            // // let 
            // novodados= JSON.parse(cadastros);
            // novodados.push(dados);
            // localStorage.removeItem("cd-usuarios")
            // localStorage.setItem("cd-usuarios", JSON.stringify(novodados))
            // // let cadastros = localStorage.getItem("")

            // alert("Cadastro realizado com sucesso!")
          }
        }
      }
    function excluir(i, nome){
        confirmAlert({
            title: 'Excluir Usuário',
            message: `Tem certeza que deseja excluir ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => alert('Click Yes')
              },
              {
                label: 'Não',
                onClick: () => alert('Click No')
              }
            ]
          });
        // window.confirm()
    }
    
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Cadastro de Usuário" />
                <section className='form'>
                    <div className='form-cadastro'>
                        <form onSubmit={salvarDados}>
                        {/* <h1 className='titulo'>Cadastro</h1> */}
                            {/* <img src={Logo}></img> */}
                            {/* <div class="cadastro"> */}
                                <label>Nome</label>
                                <input className="input-sign-in" value={nome} onChange={e=>setNome(e.target.value)} />
                                <label>Email</label>
                                <input className="input-sign-in" value={email} onChange={e=>setEmail(e.target.value)} />
                                <label>Senha</label>
                                <input className="input-sign-in" value={senha} onChange={e=>setSenha(e.target.value)} type="password"/>
                                <label>Confirme a Senha</label>
                                <input className="input-sign-in" value={confSenha} onChange={e=>setConfSenha(e.target.value)} onKeyUp={validarSenha} type="password"/>
                                <p>{msg}</p>
                                <button className='button-login' type='submit'>Salvar</button>
                            {/* </div> */}
                        </form>
                    </div>
                </section>
            </div>
        </div>

)
}