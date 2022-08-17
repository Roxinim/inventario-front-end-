import React,{useState} from 'react'
// import './style.css'
import '../../../global.css'
import { useHistory } from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import Usuarios from '../../../server/usuario.json'
import {confirmAlert} from 'react-confirm-alert' 
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../../../components/head/react-confirm-alert.css'
export default function EnterprisesSignIn(){
    
    const history =  useHistory();
    const [nome, setNome] = useState('');
    const [resp,setResp] = useState('');
    const [contato,setContato] = useState('');
    const [msg, setMsg] = useState('');
    
    // const dados=[
    //     {
    //     id:1,
    //     email:email,
    //     nome:nome,  
    //     senha:senha
    //   }
    // ]
    function salvarDados(e){
        e.preventDefault();
        
        let index=0;
        if(nome.length<3){
          setMsg("O Nome precisa ter 3 caracteres ou mais.")
          index++
        } else if(nome==="" ||resp===""||contato===""){
          setMsg("Preencha os campos!")
          index++
        }
        if (index===0){
            let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas")||"[]")
            listaEmpresa.push(
                {
                    id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                    nome:nome,  
                    resp:resp,
                    contato:contato
                }
            )
            localStorage.setItem("cd-empresas",JSON.stringify(listaEmpresa))
            alert("Cadastro realizado!")
            window.location.href="/enterprises"

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
    // function excluir(i, nome){
    //     confirmAlert({
    //         title: 'Excluir Usuário',
    //         message: `Tem certeza que deseja excluir ${nome}?`,
    //         buttons: [
    //           {
    //             label: 'Sim',
    //             onClick: () => alert('Click Yes')
    //           },
    //           {
    //             label: 'Não',
    //             onClick: () => alert('Click No')
    //           }
    //         ]
    //       });
    //     // window.confirm()
    // }
    
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Cadastro de Empresa" />
                <section className='form'>
                    <div className='form-cadastro'>
                        <form onSubmit={salvarDados}>
                        {/* <h1 className='titulo'>Cadastro</h1> */}
                            {/* <img src={Logo}></img> */}
                            {/* <div class="cadastro"> */}
                                <label>Nome</label>
                                <input className="input-sign-in" value={nome} onChange={e=>setNome(e.target.value)} />
                                <label>Responsável</label>
                                <input className="input-sign-in" value={resp} onChange={e=>setResp(e.target.value)} />
                                <label>Contato</label>
                                <input className="input-sign-in" value={contato} onChange={e=>setContato(e.target.value)}/>
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