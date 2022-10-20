import React, {useState, useEffect} from 'react'
import "../../../global.css"
import {useParams} from 'react-router-dom'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function StockingEdit() {
    
    const {id} = useParams();
    const [idusu, setIdusu] = useState('');
    const [idpat, setIdpat] = useState('');
    const [idset, setIdset] = useState('');
    const [idemp, setIdemp] = useState('');

    const [usuario, setUsuario] = useState([]);
    const [patrimonio, setPatrimonio] = useState([]);
    const [setor, setSetor] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [desde, setDesde] = useState('');
    const [msg, setMsg] = useState('');

    const dados = 
        {id,
        idusu,
        idpat,
        idset,
        idemp,
        desde}
    useEffect(()=>{
        mostrarDados();
        montarselect();
    },[])
    function formatardata(d){
        var data = new Date(d),
            dia  = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia:dia,
            mes = (data.getMonth()+1).toString(),
            mesF = (mes.length === 1) ? '0'+mes:mes,
            anoF = data.getFullYear();
            return anoF+"-"+mesF+"-"+diaF
    }
    function mostrarDados(){
        api.get(`/lotacao/${id}`)
        .then(res=>{
            if(res.status===200){
                let resultado=res.data.lotacao;
                setIdusu(resultado[0].id_usuario);
                setIdpat(resultado[0].id_patrimonio);
                setIdset(resultado[0].id_setor);
                setIdemp(resultado[0].id_empresa);
                setDesde(resultado[0].desde)
                console.log(resultado)
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
    function montarselect(){
        api.get(`/usuarios/`)
        .then(res=>{
            if(res.status===200){
                // let resultado=res.data.usuario;
                setUsuario(res.data.usuario);
            } else{console.log("Houve um erro na requisição")}
        })
        api.get(`/empresas/`)
        .then(res=>{
            if(res.status===200){
                // let resultado=res.data.empresa;
                setEmpresa(res.data.empresa);
            } else{console.log("Houve um erro na requisição")}
        })
        api.get(`/patrimonios/`)
        .then(res=>{
            if(res.status===200){
                // let resultado=res.data.patrimonio;
                setPatrimonio(res.data.patrimonio);
            } else{console.log("Houve um erro na requisição")}
        })
        api.get(`/setores/`)
        .then(res=>{
            if(res.status===200){
                // let resultado=res.data.setor;
                setSetor(res.data.setor);
            } else{console.log("Houve um erro na requisição")}
        })
    }
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        // if(nome.length<3){
        //     setMsg("O Nome precisa ter 3 caracteres ou mais.")
        //     index++
        // } else 
        if(usuario===""||patrimonio===""||setor===""||empresa===""||desde===""){
            setMsg("Preencha os campos!")
            index++
        }
        if (index===0){   
            api.patch("lotacao",
            dados,
            {headers:{'Content-Type':'application/json'}}).then(function (response){
                alert("DEU CERTO");
                window.location.href="/stocking";
                console.log(dados)
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
                    <div className="form-cadastro">
                        <form onSubmit={salvarDados}>
                        <label>Id Usuário</label>
                            <select value={idusu} onChange={e=>setIdusu(e.target.value)}>
                                <option></option>
                                {usuario.map(usu=>{
                                        return(
                                            <option value={usu.id}>{usu.nome}</option>
                                            // <option label={usu.nome}>{usu.id}</option>
                                            // {usu.nome}
                                        )
                                    })
                                }
                            </select>
                            
                            <label>Id Patrimônio</label>
                            <select value={idpat} onChange={e=>setIdpat(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                    patrimonio.map(usu=>{
                                        return(
                                            <option label={usu.nome}>{usu.id}</option>
                                        )
                                    })
                                }
                            </select>

                            <label>Id Setor</label>
                            <select value={idset} onChange={e=>setIdset(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                    setor.map(usu=>{
                                        return(
                                            <option label={usu.nome}>{usu.id}</option>
                                        )
                                    })
                                }
                            </select>

                            <label>Id Empresa</label>
                            <select value={idemp} onChange={e=>setIdemp(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                    empresa.map(usu=>{
                                        return(
                                            <option label={usu.nome}>{usu.id}</option>
                                        )
                                    })
                                }
                            </select>
                            --------------------------------------------------------
                            {/* <label>Usuário</label>
                            <input className="input-sign-in" value={usuario} onChange={e=>setUsuario(e.target.value)} />
                            <label>Patrimônio</label>
                            <input className="input-sign-in" value={patrimonio} onChange={e=>setPatrimonio(e.target.value)} />
                            <label>Setor</label>
                            <input className="input-sign-in" value={setor} onChange={e=>setSetor(e.target.value)} />
                            <label>Empresa</label>
                            <input className="input-sign-in" value={empresa} onChange={e=>setEmpresa(e.target.value)} /> */}
                            <label>Data</label>
                            <input type={"date"} value={formatardata(desde)}onChange={e=>setDesde(e.target.value)}/>
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

    )
}