import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function EnterprisesEdit() {
    
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [contato, setContato] = useState('');
    const [msg, setMsg] = useState('');
    const dados = 
        {id,
        nome,
        responsavel,
        contato}
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        api.get(`/empresas/${id}`)
        .then(res=>{
            if(res.status===200){
                let resultado=res.data.empresa
                setNome(resultado[0].nome);
                setResponsavel(resultado[0].responsavel);
                setContato(resultado[0].contato);
            } else{console.log("Houve um erro na requisição")}
        });
        // let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas"))
        // listaEmpresa.filter(value => value.id == id).map(value =>{
        //     setNome(value.nome);
        //     setResp(value.resp);
        //     setContato(value.contato);
        // })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        if(nome.length<3){
            setMsg("O Nome precisa ter 3 caracteres ou mais.")
            index++
        } else if(nome==="" ||responsavel===""||contato===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){    
            api.patch("empresas",
                dados,
                {headers:{'Content-Type':'application/json'}}).then(function (response){
                    alert("DEU CERTO");
                    window.location.href="/enterprises";
                })          
            // let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresas"))
            // listaEmpresa.map((item)=>{
            //     if(item.id==id){
            //         item.nome=nome;
            //         item.responsavel=responsavel;
            //         item.contato=contato;
            //     }
            // })
            // localStorage.setItem("cd-empresas",JSON.stringify(listaEmpresa))
            // window.location.href="/enterprises"
            }
        }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Empresa" />
                <section className='form'>
                    <div className="form-cadastro">
                        <form onSubmit={salvarDados}>
                            <label>Nome</label>
                            <input className="input-sign-in" value={nome} onChange={e => setNome(e.target.value)} />
                            <label>Responsável</label>
                            <input className="input-sign-in" value={responsavel} onChange={e => setResponsavel(e.target.value)} />
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