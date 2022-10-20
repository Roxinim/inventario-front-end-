import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function PatrimonyEdit() {
    
    const {id} = useParams();
    const [nome, setNome] = useState('');
    const [msg, setMsg] = useState('');
    const dados = 
        {id,
        nome}
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        api.get(`/patrimonios/${id}`)
        .then(res=>{
            if(res.status===200){
                let resultado=res.data.patrimonio
                setNome(resultado[0].nome);
            } else{console.log("Houve um erro na requisição")}
        });
        // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio"))
        // listaPatrimonio.filter(value => value.id == id).map(value =>{
        //     setNome(value.nome);
        // })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        if(nome.length<3){
            setMsg("O Nome precisa ter 3 caracteres ou mais.")
            index++
        } else if(nome===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){       
            api.patch("patrimonios",
                dados,
                {headers:{'Content-Type':'application/json'}}).then(function (response){
                    alert("DEU CERTO");
                    window.location.href="/patrimony";
                })       
            // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio"))
            // listaPatrimonio.map((item)=>{
            //     if(item.id==id){
            //         item.nome=nome;
            //     }
            // })
            // localStorage.setItem("cd-patrimonio",JSON.stringify(listaPatrimonio))
            // window.location.href="/patrimony"
            }
        }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Patrimônio" />
                <section className='form'>
                    <div class="form-cadastro">
                        <form onSubmit={salvarDados}>
                            <label>Nome</label>
                            <input className="input-sign-in" value={nome} onChange={e => setNome(e.target.value)} />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}