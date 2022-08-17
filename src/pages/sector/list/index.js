import React, { useEffect, useState } from 'react'
import "../../../global.css"
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import {GoTrashcan} from "react-icons/go"
import {BiEditAlt} from "react-icons/bi"
import {confirmAlert} from 'react-confirm-alert';
import {FiFilePlus} from 'react-icons/fi'
import '../../../components/head/react-confirm-alert.css'
export default function SectorList(){
    const [dados, setDados] = useState([]);
    useEffect(()=>{
    mostrarlista();
    },[])
    function editar(i){
        window.location.href=`/sector-edit/${i}`
    }
    function mostrarlista(){
        let cadastros = JSON.parse(localStorage.getItem("cd-setor")||"[]");;
        setDados(cadastros);
    }
    function excluir(i, nome){
        confirmAlert({
            title: 'Excluir Setor',
            message: `Tem certeza que deseja excluir ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () =>{
                    let dadosnovos = []
                    dadosnovos=dados.filter(item=>item.id!==i)
                    setDados(dadosnovos)
                    localStorage.setItem("cd-setor",JSON.stringify(dadosnovos))
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
                <Head title="Setors" />
                <a href='/sector-sign-in' title='Cadastrar' className='cadastrar'> <FiFilePlus size={50} color="green" cursor="pointer"/> </a>
                {dados.length>0 ?
                <table border={5}>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                    {
                        dados.map(usu=>{
                            return(
                            <tr>
                                <td>{usu.id}</td>
                                <td>{usu.nome}</td>
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
                        <th>Nome</th>            
                    </tr>
                </table>
                }
            </div>
        </div>
)
}