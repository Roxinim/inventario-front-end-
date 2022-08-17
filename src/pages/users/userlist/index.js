import React, { useEffect, useState } from 'react'
import './style.css'
import "../../../global.css"
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import Usuarios from '../../../server/usuario.json'
import {GoTrashcan} from "react-icons/go"
import {BiEditAlt} from "react-icons/bi"
import { confirmAlert } from 'react-confirm-alert'; 
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import '../../../components/head/react-confirm-alert.css'
import { FiFilePlus } from 'react-icons/fi'
export default function UserList(){
    const [dados, setDados] = useState([]);
    useEffect(()=>{
    mostrarlista();
    },[])
    function editar(i){
        window.location.href=`/edit-user/${i}`
    }
    function mostrarlista(){
        // let novodados=[];
        let cadastros = JSON.parse(localStorage.getItem("cd-usuarios")||"[]");;
        setDados(cadastros);
    }
    function excluir(i, nome){
        confirmAlert({
            title: 'Excluir Usuário',
            message: `Tem certeza que deseja excluir ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () =>{
                    let dadosnovos = []
                    dadosnovos=dados.filter(item=>item.id!==i)
                    setDados(dadosnovos)
                    localStorage.setItem("cd-usuarios",JSON.stringify(dadosnovos))
                } 
              },
              {
                label: 'Não',
                // onClick: () => 
              }
            ]
          });
        // window.confirm()
    }
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Lista de Usuários" />
                
                <a href='/sign-in' title='Cadastrar' className='cadastrar' color='green'><FiFilePlus size={50} color="green" cursor="pointer"/> </a>
                {/* <h1>Lista de Usuários</h1> */}
                {dados.length>0 ?
                <table border={5}>
                    
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        
                    </tr>
                   
                    {
                        dados.map(usu=>{
                            return(
                            <tr>
                                <td>{usu.id}</td>
                                <td>{usu.nome}</td>
                                <td>{usu.email}</td>
                                <td className='btn' onClick={(e)=>editar(usu.id)}><BiEditAlt /></td>
                                <td className='btn' onClick={(e)=>excluir(usu.id, usu.nomeusuario)}><GoTrashcan /></td>
                                
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
                        <th>Email</th>
                        
                    </tr>
                </table>
                }
            </div>
        </div>

)
}