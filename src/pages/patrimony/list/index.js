import React, { useEffect, useState } from 'react'
import "../../../global.css"
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import {GoTrashcan} from "react-icons/go"
import {BiEditAlt} from "react-icons/bi"
import {confirmAlert} from 'react-confirm-alert';
import {FiFilePlus} from 'react-icons/fi'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function PatrimonyList(){
    const [dados, setDados] = useState([]);
    useEffect(()=>{
    mostrarlista();
    },[])
    function editar(i){
        window.location.href=`/patrimony-edit/${i}`
    }
    function mostrarlista(){
        api.get('/patrimonios')
        .then(res=>{
            if(res.status==200){
                setDados(res.data.patrimonio);
            } else{console.log("Houve um erro na requisição")}
        })
        .then((data)=>console.log(data));
        // let cadastros = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]");;
        // setDados(cadastros);
    }
    function excluir(i, nome){
        confirmAlert({
            title: 'Excluir Patrimônio',
            message: `Tem certeza que deseja excluir ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () =>{
                    api.delete(`/patrimonios/${i}`)
                    .then(res=>{});
                    alert("Dados deletados com sucesso!");
                    window.location.reload();
                    // let dadosnovos = []
                    // dadosnovos=dados.filter(item=>item.id!==i)
                    // setDados(dadosnovos)
                    // localStorage.setItem("cd-patrimonio",JSON.stringify(dadosnovos))
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
                <Head title="Patrimônios" />
                <a href='/patrimony-sign-in' title='Cadastrar' className='cadastrar'> <FiFilePlus size={50} color="green" cursor="pointer"/> </a>
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