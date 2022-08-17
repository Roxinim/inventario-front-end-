import React,{useEffect, useState} from 'react'
import '../../../global.css'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
export default function StockingSignIn(){
    
    const [idusu, setIdusu] = useState('');
    const [idpat, setIdpat] = useState('');
    const [idset, setIdset] = useState('');
    const [idemp, setIdemp] = useState('');
    const [data, setData] = useState('');
    const [usuario, setUsuario] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [patrimonio, setPatrimonio] = useState('');
    const [setor, setSetor] = useState('');
    let listaUsuario =    JSON.parse(localStorage.getItem("cd-usuarios")||"[]")
    let listaEmpresa =    JSON.parse(localStorage.getItem("cd-empresas")||"[]")
    let listaSetor =      JSON.parse(localStorage.getItem("cd-setor")||"[]")
    let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
    // const [datamovimentacao, setDatamovimentacao] = useState('');
    const [msg, setMsg] = useState('');
    // useEffect(()=>{
    //     listarDados();
    // },[])
    // function listarDados(){
    //     // let listaUsuario = JSON.parse(localStorage.getItem("cd-usuario")||"[]")
    //     // let listaEmpresa = JSON.parse(localStorage.getItem("cd-empresa")||"[]")
    //     // let listaSetor = JSON.parse(localStorage.getItem("cd-setor")||"[]")
    //     // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
    // }
        
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        // if(nome.length<3){
        //   setMsg("O Nome precisa ter 3 caracteres ou mais.")
        //   index++
        // } else 
        // 
        if(idusu===""||idpat===""||idset===""||idemp===""||data===""){
          setMsg("Preencha os campos!")
          index++
        }
        if (index===0){
            let listaLotacao = JSON.parse(localStorage.getItem("cd-lotacao")||"[]")
            listaLotacao.push(
                    {
                        id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
                        idusu:idusu,
                        idpat:idpat,
                        idset:idset,
                        idemp:idemp,
                        data:data
                    }
                )
            localStorage.setItem("cd-lotacao",JSON.stringify(listaLotacao))
            alert("Cadastro realizado!")
            console.log(listaLotacao)
            localStorage.getItem("cd-lotacao")
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
            
            window.location.href="/stocking"
        }
        
    }
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
                                listaUsuario.map(usu=>{
                                    return(
                                        <option label={usu.nome}>{usu.id}</option>
                                    )
                                })
                                }
                            </select>
                            
                            <label>Id Patrimônio</label>
                            <select onChange={e=>setIdpat(e.target.options[e.target.selectedIndex].text)}>
                                <option></option>
                                {
                                listaPatrimonio.map(usu=>{
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
                                listaSetor.map(usu=>{
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
                                listaEmpresa.map(usu=>{
                                    return(
                                        <option label={usu.nome}>{usu.id}</option>
                                    )
                                })
                                }
                            </select>
                            <label>Data</label>
                            <input type={"date"} onChange={e=>setData(e.target.value)}/>
                            <p>{msg}</p>
                            <button className='button-login' type='submit'>Salvar</button>
                        </form>
                    </div>
                </section>
            </div>
        </div>

)
}