import React,{useEffect, useState} from 'react'
import './style.css'
import "../../global.css"
import {useHistory} from 'react-router-dom'
import Usuario from '../../server/usuario.json'
export default function Logon(){
    const history =  useHistory();
    let [id, setId] = useState('');
    let [nome, setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const dados=[{
        email:email,
        nome:nome,
        id:id,
        senha:senha
        }]
    function logar(){
        // e.preventDefault()
        let usu;
        if(email == ""|| senha==""){
            alert("Preencha os campos necessários!");
        } else {
            usu=Usuario.filter(function(value){
                return value.email==email && value.senha==senha;

            })
            if(usu.length>0){
                // usu.filter(function(value){
                //     setNome(value.nomeusuario)
                //     setId(value.id)
                // })
                // console.log(dados.nome)  
                console.log(usu)
                // setSenha(usu[0].senha)
                setNome(usu[0].nomeusuario)
                setId(usu[0].id)
                // setTimeout(e=> {
                    localStorage.setItem("usuario",JSON.stringify(usu))

                    // console.log(dados)  
                    // const value = localStorage.getItem("usuario")
                    // const json=JSON.parse(value)
                    // console.log(value)
                    // console.log(json)
                    history.push('/dashboard')
                // }, 1000);

            } else {alert("Email ou senha inválidos.")}

            // Usuario.map(usu=>{
            //     if(usu.email===email && usu.senha===senha){
            //         history.push('/dashboard');

            //     } else{
            //         setMsg("Dados não conferem!)                    
            //     }
            // })
        }
    }
    // alert("Email ou senha inválido, tente novamente.")
    return( 
        <div className='logon-container'>
            {/* <p className=''>
                Esta é a pagina Logon
            </p> */}
            <section className='form'>
                
                <form onSubmit={logar}>
                <h1 className='titulo'>Sistema de Inventário</h1>

                    {/* <img src={Logo}></img> */}
                    
                    <h1 id='logintitle'>Login</h1>
                    <input className='input' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
                    <i className='aviso1'><small>Insira um email válido!</small></i>
                    <input className='input' placeholder='Senha' value={senha} onChange={e=>setSenha(e.target.value)} type="password"/>
                    <button className='button-login' type='submit'>Entrar</button>
                </form>
            </section>
            <section className='imagem'>
                
                <img src='https://static2.minhalojanouol.com.br/tupperwaredocerrado/produto/multifotos/hd/20210515182711_1740998260_DZ.png'></img>
            </section>
        </div>
    )
}