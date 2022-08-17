import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
export default function StockingEdit() {
    
    const {id} = useParams();
    const [idusu, setIdusu] = useState('');
    const [idpat, setIdpat] = useState('');
    const [idset, setIdset] = useState('');
    const [datamovimentacao, setDatamovimentacao] = useState('');
    const [msg, setMsg] = useState('');
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao"))
        listaLotacao.filter(value => value.id == id).map(value =>{
            setIdusu(value.idusu)
            setIdpat(value.idpat)
            setIdset(value.idset)
            setDatamovimentacao(value.datamovimentacao)
        })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        // if(nome.length<3){
        //     setMsg("O Nome precisa ter 3 caracteres ou mais.")
        //     index++
        // } else 
        if(idusu===""||idpat===""||idset===""||datamovimentacao===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){          
            let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao"))
            listaLotacao.map((item)=>{
                if(item.id==id){
                    item.idusu=idusu;
                    item.idpat=idpat;
                    item.idset=idset;
                    item.datamovimentacao=datamovimentacao;
                }
            })
            localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao))
            window.location.href="/stocking"
            }
        }
    return (
        <div className='dashboard-container'>
            <Menu />
            <div className='principal'>
                <Head title="Editar Lotação" />
                <section className='form'>
                    <div class="form-cadastro">
                        <form onSubmit={salvarDados}>
                            <label>Id Usuário</label>
                            <input className="input-sign-in" value={idusu} onChange={e=>setIdusu(e.target.value)} />
                            <label>Id Patrimônio</label>
                            <input className="input-sign-in" value={idpat} onChange={e=>setIdpat(e.target.value)} />
                            <label>Id Setor</label>
                            <input className="input-sign-in" value={idset} onChange={e=>setIdset(e.target.value)} />
                            <label>Datamovimentação</label>
                            <input className="input-sign-in" value={datamovimentacao} onChange={e=>setDatamovimentacao(e.target.value)} />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}