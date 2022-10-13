import React,{useEffect, useState} from 'react'
import './style.css'
import "../../global.css"
import {useHistory} from 'react-router-dom'
// import Usuario from '../../server/usuario.json'
import api from '../../server/api'
import PropTypes from 'prop-types';

export default function Logon(){
                        // {setToken}
    // const history =  useHistory();
    let [id, setId] = useState('');
    let [nome, setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const dados=[{
        email:email,
        senha:senha,
        nome:nome,
        id:id
        }]
             
    async function loginUser(credentials) {
        if(email === ""|| senha===""){
            alert("Preencha os campos necessários!");
        } else {
            // return fetch('http://localhost:5000/login', {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify(credentials)
            // })
            // .then(data => data.json())

            api.post(`/usuarios/logar`,{email:email,senha:senha})
            .then(res => {
              if(res.status===200){
                let resultado=res.data.usuario;
                    if(resultado.length>0){
                        return fetch('http://localhost:5000/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                        })
                        .then(data => data.json())
                        // window.location.href="/dashboard"
                    }else{
                        alert("Digite Email ou Senha validos")
                    }
    
              }else{
                  console.log("houve um erro na requisição")
              }
    
            })  
            .catch(function (error) {
              console.log(error);
            });
        }

        // return fetch('http://localhost:8080/login', {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(credentials)
        // })
        // .then(data => data.json())
    }
    const handleSubmit = async e => {
        e.preventDefault();

        const token = await loginUser({
          email,
          senha
        });
        // setToken(token);

        // console.log(token)

        // if(email === ""|| senha===""){
        //     alert("Preencha os campos necessários!");
        // } else {
    
        //     api.post(`/usuarios/logar`,{email:email,senha:senha})
        //     .then(res => {
        //       if(res.status===200){
        //         let resultado=res.data.usuario;
        //             if(resultado.length>0){
        //                 const token = await loginUser({
        //                     email,
        //                     senha
        //                 });
        //                 setToken(token);
        //                 // return fetch('http://localhost:8080/login', {
        //                 // method: 'POST',
        //                 // headers: {
        //                 //     'Content-Type': 'application/json'
        //                 // },
        //                 // body: JSON.stringify(credentials)
        //                 // })
        //                 // .then(data => data.json())
        //                 // window.location.href="/dashboard"
        //             }else{
        //                 alert("Digite Email ou Senha validos")
        //             }
    
        //       }else{
        //           console.log("houve um erro na requisição")
        //       }
    
        //     })  
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // }
    }  

    function logar(e){
        e.preventDefault()
        // let usu;
        if(email === ""|| senha===""){
            alert("Preencha os campos necessários!");
        } else {
            api.post(`/usuarios/logar`,{email:email,senha:senha})
            .then(res => {
              if(res.status===200){
                let resultado=res.data.usuario;
                    if(resultado.length>0){
                        let session=
                        {
                            nome:resultado[0].nome,
                            email:resultado[0].email,
                            id:resultado[0].id
                        }

                        //aqui setamos a chave na sessionStorage
                        sessionStorage.setItem("session",JSON.stringify(session))
                        window.location.href="/dashboard"
                    }else{
                        sessionStorage.clear();
                        alert("Digite Email ou Senha validos")
                    }

              }else{
                  console.log("houve um erro na requisição")
              }

            })  
            .catch(function (error) {
              console.log(error);
            });
        }
    }

            // usu=Usuario.filter(function(value){
            //     return value.email==email && value.senha==senha;

            // })
            // if(usu.length>0){
            //     // usu.filter(function(value){
            //     //     setNome(value.nomeusuario)
            //     //     setId(value.id)
            //     // })
            //     // console.log(dados.nome)  
            //     console.log(usu)
            //     // setSenha(usu[0].senha)
            //     setNome(usu[0].nomeusuario)
            //     setId(usu[0].id)
            //     // setTimeout(e=> {
            //         localStorage.setItem("usuario",JSON.stringify(usu))

            //         // console.log(dados)  
            //         // const value = localStorage.getItem("usuario")
            //         // const json=JSON.parse(value)
            //         // console.log(value)
            //         // console.log(json)
            //         history.push('/dashboard')
            //     // }, 1000);

            // } else {alert("Email ou senha inválidos.")}

            // Usuario.map(usu=>{
            //     if(usu.email===email && usu.senha===senha){
            //         history.push('/dashboard');

            //     } else{
            //         setMsg("Dados não conferem!)                    
            //     }
            // })
        
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
                
                {/* <img src='https://static20.minhalojanouol.com.br/tupperwaredocerrado/produto/multifotos/hd/20210515182711_1740998260_DZ.png'></img> */}
                <img src='https://d1j3qugeyybc8o.cloudfront.net/app/uploads/2022/08/ExpertAppraisal_icon_Web.png'></img>
            </section>
        </div>
    )
}
Logon.propTypes = {
    setToken: PropTypes.func.isRequired
  };