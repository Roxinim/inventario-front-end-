import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
export default function EnterprisesEdit() {
    
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [resp,setResp] = useState('');
    const [contato,setContato] = useState('');
    const [msg, setMsg] = useState('');
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas"))
        listaEmpresa.filter(value => value.id == id).map(value =>{
            setNome(value.nome);
            setResp(value.resp);
            setContato(value.contato);
        })
    }
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
            let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas"))
            listaEmpresa.map((item)=>{
                if(item.id==id){
                    item.nome=nome;
                    item.resp=resp;
                    item.contato=contato;
                }
            })
            localStorage.setItem("cd-empresas",JSON.stringify(listaEmpresa))
            window.location.href="/enterprises"
            }
        }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Empresa" />
                <section className='form'>
                    <div class="form-cadastro">
                        <form onSubmit={salvarDados}>
                            <label>Nome</label>
                            <input className="input-sign-in" value={nome} onChange={e => setNome(e.target.value)} />
                            <label>Responsável</label>
                            <input className="input-sign-in" value={resp} onChange={e => setResp(e.target.value)} />
                            <label>Contato</label>
                            <input className="input-sign-in" value={contato} onChange={e => setContato(e.target.value)} />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}