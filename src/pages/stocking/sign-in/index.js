import React,{useEffect, useState} from 'react'
import '../../../global.css'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import api from '../../../server/api'

export default function StockingSignIn(){
    
    const [idusu, setIdusu] = useState('');
    const [idpat, setIdpat] = useState('');
    const [idset, setIdset] = useState('');
    const [idemp, setIdemp] = useState('');
    const [desde, setDesde] = useState('');
    const [usuario, setUsuario] = useState([]);
    const [empresa, setEmpresa] = useState([]);
    const [patrimonio, setPatrimonio] = useState([]);
    const [setor, setSetor] = useState([]);
    // let listaUsuario =    JSON.parse(localStorage.getItem("cd-usuarios")||"[]")
    // let listaEmpresa =    JSON.parse(localStorage.getItem("cd-empresas")||"[]")
    // let listaSetor =      JSON.parse(localStorage.getItem("cd-setor")||"[]")
    // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
    // const [datamovimentacao, setDatamovimentacao] = useState('');
    const [msg, setMsg] = useState('');
    const dados={
        idusu,
        idpat,
        idset,
        idemp,
        desde
    }
    useEffect(()=>{
        montarselect();
    },[])
    // function listarDados(){
    //     // let listaUsuario = JSON.parse(localStorage.getItem("cd-usuario")||"[]")
    //     // let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresa")||"[]")
    //     // let listaSetor = JSON.parse(localStorage.getItem("cd-setor")||"[]")
    //     // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
    // }
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
        if(idusu===""||idpat===""||idset===""||idemp===""||desde===""){
            setMsg("Preencha os campos!")
            index++
          }
          if (index===0){
              api.post("lotacao",
                  dados,
                  {headers:{'Content-Type':'application/json'}}).then(function(response){
                      alert("DEU CERTO");
                      window.location.href="/stocking";
              })
        }
        console.log(dados)

    }
        // if(nome.length<3){
        //   setMsg("O Nome precisa ter 3 caracteres ou mais.")
        //   index++
        // } else 
        // 
        
            // let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao")||"[]")
            // listaLotacao.push(
            //         {
            //             id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
            //             idusu:idusu,
            //             idpat:idpat,
            //             idset:idset,
            //             idemp:idemp,
            //             data:data
            //         }
            //     )
            // localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao))
            // alert("Cadastro realizado!")
            // console.log(listaLotacao)
            // localStorage.getItem("cd-lotacao")

            // console.log(idemp)
            // setUsuario(listaUsuario)
            // setEmpresa(listaEmpresa)
            // setSetor(listaSetor)
            // setPatrimonio(listaPatrimonio)

            // listaLotacao.push(
            //     {
            //         id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
            //         idusu:idusu,
            //         idpat:idpat,
            //         idset:idset,
            //         datamovimentacao:datamovimentacao
            //     }
            // )
            // localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao))
            
            // window.location.href="/stocking"
        
    // function setarUsu(){
    //     // setIdusu(e.target.options[e.target.selectedIndex].text)
    //     console.log("oi")
    // }
    // const [selectusu, setSelectusu]=useState('');
    // const asdasdasd = event =>{
    //     console.log(event.target.value);
    //     setSelectusu(event.target.value);
    // }
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Cadastro de Lotação" />
                <section className='form'>
                    <div className='form-cadastro'>
                        <form onSubmit={salvarDados}>
                            <label>Id Usuário</label>
                            <select onChange={e=>setIdusu(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                    usuario.map(usu=>{
                                        return(
                                            <option label={usu.nome}>{usu.id}</option>
                                            // {usu.nome}
                                        )
                                    })
                                }
                            </select>
                            
                            <label>Id Patrimônio</label>
                            <select onChange={e=>setIdpat(e.target.options[e.target.selectedIndex].text)}>
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
                            <select onChange={e=>setIdset(e.target.options[e.target.selectedIndex].text)}>
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
                            <select onChange={e=>setIdemp(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                    empresa.map(usu=>{
                                        return(
                                            <option label={usu.nome}>{usu.id}</option>
                                        )
                                    })
                                }
                            </select>
                            <label>Data</label>
                            <input type={"date"} onChange={e=>setDesde(e.target.value)}/>
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

)
}