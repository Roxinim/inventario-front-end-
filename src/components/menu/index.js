import React,{useEffect,useState} from 'react'
import './style.css'
import '../../global.css'
import { FiUser, FiTruck} from 'react-icons/fi'
import { RiNewspaperLine } from 'react-icons/ri'
import { IoIosPeople } from "react-icons/io";
import { TbBuildingSkyscraper } from "react-icons/tb";
import Usuarios from '../../server/usuario.json'
export default function Menu(){
    const [nome,setNome] = useState("")
    function buscarnome(){

    const value =localStorage.getItem("usuario");
    const usu = JSON.parse(value);
    setNome(usu[0].nomeusuario)
    }
    useEffect(()=>{
        buscarnome()
    },[])
    return( 
        <div className='menu'>
            <div>
                <h1>Menu</h1>
                <a href='/userlist'><FiUser/>Usuários</a>
                <a href='/enterprises'><FiTruck/>Empresas</a>
                <a href='/patrimony'><RiNewspaperLine/>Patrimônio</a>
                <a href='/stocking'><IoIosPeople/>Lotação</a>
                <a href='/sector'><TbBuildingSkyscraper/>Setor</a>
            </div>
           
            <p>Bem-vindo, {nome}!</p>

        </div>
    )
}