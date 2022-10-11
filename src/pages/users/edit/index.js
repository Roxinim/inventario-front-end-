import React, { useState, useEffect } from 'react'
import './style.css'
import "../../../global.css"
import {  useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
// import Usuarios from '../../../server/usuario.json'
// import { confirmAlert } from 'react-confirm-alert';
import api from '../../../server/api'
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../../../components/head/react-confirm-alert.css'
export default function UserEdit() {
    
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    const [valida, setValida] = useState(true);
    const [msg, setMsg] = useState('');
    const dados = 
        {id,
        email,
        nome,
        senha}
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        // let listaUser = JSON.parse(localStorage.getItem("cd-usuarios"))
        // listaUser.filter(value => value.id == id).map(value =>{
        //     setNome(value.nome);
        //     setEmail(value.email);
        //     setSenha(value.senha);
        //     setConfSenha(value.senha);
        // })
        api.get(`/usuarios/${id}`)
        .then(res=>{
            if(res.status===200){
                let resultado=res.data.usuario
                setNome(resultado[0].nome);
                setEmail(resultado[0].email);
                setSenha(resultado[0].senha);
                setConfSenha(resultado[0].senha);
            } else{console.log("Houve um erro na requisição")}
        })
        .catch(function(error){
            console.log(error);
        });
    }
    function validarSenha() {
        if (senha !== "") {
            if (senha !== confSenha) {
                setValida(false)
                setMsg("Senhas NÃO conferem!")
            } else {
                setValida(true)
                setMsg("Senhas conferem!")
            }
        } else {
            setValida(false)
            setMsg("Digite uma senha!")
            setTimeout(() => {
                setMsg("")
            }, 4000);
        }
    }
    function salvarDados(e) {
        e.preventDefault();
        validarSenha();
        if (valida === false) {
            setMsg("Cadastro falhou, tente novamente")
        } else {
            let index = 0;
            if (nome.length <= 3) {
                setMsg("O Nome precisa ter acima de 3 caracteres.")
                index++
            } else if (email === "") {
                setMsg("O Email está vazio!")
                index++
            }
            if (index === 0) {
                api.patch("usuarios",
                dados,
                {headers:{'Content-Type':'application/json'}}).then(function (response){
                    alert("DEU CERTO");
                    window.location.href="/userlist";
                })                             
                // alert("Cadastro realizado com sucesso!")
                // let listaUser = JSON.parse(localStorage.getItem("cd-usuarios"))
                // listaUser.map((item)=>{
                //     if(item.id==id){
                //         item.nome=nome;
                //         item.email=email;
                //         item.senha=senha;
                //     }
                // })
                // localStorage.setItem("cd-usuarios",JSON.stringify(listaUser))
                // window.location.href="/userlist"
            }
        }
    }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Usuário" />
                <section className='form'>
                    <div className="form-cadastro">
    
                        <form onSubmit={salvarDados}>
                            {/* <p>{id}</p> */}
                            {/* <h1 className='titulo'>Editar Usuário</h1> */}
    
                            {/* <img src={Logo}></img> */}
                            <label>Nome</label>
                            <input className="input-sign-in" value={nome} onChange={e => setNome(e.target.value)} />
                            <label>Email</label>
                            <input className="input-sign-in" value={email} onChange={e => setEmail(e.target.value)} />
                            <label>Senha</label>
                            <input className="input-sign-in" value={senha} onChange={e => setSenha(e.target.value)} type="password" />
                            <label>Confirme a Senha</label>
                            <input className="input-sign-in" value={confSenha} onChange={e => setConfSenha(e.target.value)} onKeyUp={validarSenha} type="password" />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}