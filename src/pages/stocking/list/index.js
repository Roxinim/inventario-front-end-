import React, { useEffect, useState } from 'react'
import "../../../global.css"
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import {GoTrashcan} from "react-icons/go"
import {BiEditAlt} from "react-icons/bi"
import {confirmAlert} from 'react-confirm-alert';
import {FiFilePlus} from 'react-icons/fi'
import '../../../components/head/react-confirm-alert.css'
export default function Stocking(){
    // const [dadosL, setDadosL] = useState([]);
    // const [dadosU, setDadosU] = useState([]);
    // const [dadosP, setDadosP] = useState([]);
    // const [dadosS, setDadosS] = useState([]);
    const [dados, setDados] = useState([]);
    // const [idlot, setIdlot] = useState("")
    // const [idusu, setIdusu] = useState("")
    // const [idemp, setIdemp] = useState("")
    // const [idpat, setIdpat] = useState("")
    // const [idset, setIdset] = useState("")
    let listaUsuario =    JSON.parse(localStorage.getItem("cd-usuarios")||"[]")
    let listaEmpresa =    JSON.parse(localStorage.getItem("cd-empresas")||"[]")
    let listaSetor =      JSON.parse(localStorage.getItem("cd-setor")||"[]")
    let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
    useEffect(()=>{
    mostrarlista();
    },[])
    function editar(i){
        window.location.href=`/stocking-edit/${i}`
    }
    function filtrarnome(i, u){
        let dadosnovos = []
       
        switch(u){
            case 1:
            dadosnovos=listaUsuario.filter(item=>item.id==i)
            break;
            case 2:
            dadosnovos=listaPatrimonio.filter(item=>item.id==i)
            break;
            case 3:
            dadosnovos=listaSetor.filter(item=>item.id==i)
            break;
            case 4:
            dadosnovos=listaEmpresa.filter(item=>item.id==i)
            break;
        }
        // if (u==1){
        // dadosnovos=listaUsuario.filter(item=>item.id==i)
        // }
        return dadosnovos[0].nome
        // return dadosnovos.nome;
    } 
    
    function mostrarlista(){
        let cadastros = JSON.parse(localStorage.getItem("cd-lotacao")||"[]");
        setDados(cadastros);
        // let cadastrosL = JSON.parse(localStorage.getItem("")||"[]");;
        // let cadastrosU = JSON.parse(localStorage.getItem("cd-usuario")||"[]");;
        // let cadastrosP = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]");;
        // let cadastrosS = JSON.parse(localStorage.getItem("cd-setor")||"[]");;
        // setDadosL(cadastrosL);
        // setDadosU(cadastrosU);
        // setDadosP(cadastrosP);
        // setDadosS(cadastrosS);
    }
    function excluir(i, nome){
        confirmAlert({
            title: 'Excluir Lotação',
            message: `Tem certeza que deseja excluir ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () =>{
                    let dadosnovos = []
                    dadosnovos=dados.filter(item=>item.id!==i)
                    setDados(dadosnovos)
                    localStorage.setItem("cd-lotacao",JSON.stringify(dadosnovos))
                } 
              },
              {
                label: 'Não',
              }
            ]
          });
    }
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Lotação" />
                <a href='/stocking-sign-in' title='Cadastrar' className='cadastrar'> <FiFilePlus size={50} color="green" cursor="pointer"/> </a>
                {dados.length>0 ?
                <table border={5}>
                    <tr>
                        <th>Id</th>
                        <th>Usuário</th>
                        <th>Patrimônio</th>
                        <th>Setor</th>
                        <th>Empresa</th>
                        <th>Data</th>
                    </tr>
                    {
                        dados.map(usu=>{
                            return(
                            <tr>
                                <td>{usu.id}</td>
                                <td>{filtrarnome(usu.idusu, 1) }</td>
                                <td>{filtrarnome(usu.idpat, 2) }</td>
                                <td>{filtrarnome(usu.idset, 3) }</td>
                                <td>{filtrarnome(usu.idemp, 4) }</td>
                                <td>{usu.data}</td>
                                {/* <td>{usu.idpat}</td>
                                <td>{usu.idset}</td>
                                <td>{usu.idemp}</td> */}
                                <td className='btn' onClick={(e)=>editar(usu.id)}><BiEditAlt /></td>
                                <td className='btn' onClick={(e)=>excluir(usu.id, usu.nome)}><GoTrashcan /></td>
                                
                            </tr>
                            )
                        })
                    }
                </table>
                :
                <table border={5}>
                    <tr>
                        <th>Id</th>
                        <th>Usuário</th>
                        <th>Patrimônio</th>
                        <th>Setor</th>
                        <th>Empresa</th>          
                        <th>Data</th>          
                    </tr>
                </table>
                }
            </div>
        </div>
)
}