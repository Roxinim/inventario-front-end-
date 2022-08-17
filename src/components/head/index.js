import React,{useEffect,useState} from 'react'
import './style.css'
import '../../global.css'
import { useHistory } from 'react-router-dom'
import { FiFilePlus, FiLogOut } from 'react-icons/fi'
import { confirmAlert } from 'react-confirm-alert'; 
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import './react-confirm-alert.css'
export default function Head({title}){
    function Sair(i, nome){
        confirmAlert({
            title: 'Confirmar saída',
            message: `Tem certeza que deseja sair?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => logoff()
              },
              {
                label: 'Não',
                // onClick: () => {}
              }
            ]
          });
    }
    // function Redirect(){
    //     let novolink = console.log(window.location.href);
    //     novolink.substr()
    // }
    const history = useHistory();
    const logoff = ()=>{
        window.location.href="/"
    }
    return( 
        <div className='head'>
            <div className='title'>
                <h2>{title}</h2>
            </div>
            <div className='buttons'>
                {/* <a href='#' title='Cadastrar'> <FiFilePlus size={24} color="green" curso="pointer" onClick={Redirect()}/> </a> */}
                <a href='/' title='Sair'><FiLogOut size={24} color="red" cursor="pointer" onClick={Sair}/></a>
            </div>
        </div>
    )
}