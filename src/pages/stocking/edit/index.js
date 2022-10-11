import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function StockingEdit() {
    
    const {id} = useParams();
    const [usuario, setUsuario] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [setor, setSetor] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [datamovimentacao, setDatamovimentacao] = useState('');
    const [msg, setMsg] = useState('');
    const dados = 
        {id,
        usuario,
        patrimonio,
        setor,
        empresa}
    useEffect(()=>{
        mostrarDados();
    },[])
    function mostrarDados(){
        api.get(`/lotacao/${id}`)
        .then(res=>{
            if(res.status==200){
                let resultado=res.data.lotacao;
                setUsuario(resultado[0].usuario);
                setPatrimonio(resultado[0].patrimonio);
                setSetor(resultado[0].setor);
                setEmpresa(resultado[0].empresa);
            } else{console.log("Houve um erro na requisição")}
        });
        // let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao"))
        // listaLotacao.filter(value => value.id == id).map(value =>{
        //     setIdusu(value.idusu)
        //     setIdpat(value.idpat)
        //     setIdset(value.idset)
        //     setDatamovimentacao(value.datamovimentacao)
        // })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        // if(nome.length<3){
        //     setMsg("O Nome precisa ter 3 caracteres ou mais.")
        //     index++
        // } else 
        if(usuario===""||patrimonio===""||setor===""||empresa===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){   
            api.patch("lotacao",
            dados,
            {headers:{'Content-Type':'application/json'}}).then(function (response){
                alert("DEU CERTO");
                window.location.href="/stocking";
            })     
            // let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao"))
            // listaLotacao.map((item)=>{
            //     if(item.id==id){
            //         item.idusu=idusu;
            //         item.idpat=idpat;
            //         item.idset=idset;
            //         item.datamovimentacao=datamovimentacao;
            //     }
            // })
            // localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao))
            // window.location.href="/stocking"
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
                            <label>Usuário</label>
                            <input className="input-sign-in" value={usuario} onChange={e=>setUsuario(e.target.value)} />
                            <label>Patrimônio</label>
                            <input className="input-sign-in" value={patrimonio} onChange={e=>setPatrimonio(e.target.value)} />
                            <label>Setor</label>
                            <input className="input-sign-in" value={setor} onChange={e=>setSetor(e.target.value)} />
                            <label>Empresa</label>
                            <input className="input-sign-in" value={empresa} onChange={e=>setEmpresa(e.target.value)} />
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}