import React,{useEffect,useState} from 'react'
import './style.css'
import '../../global.css'
import { useHistory } from 'react-router-dom'
import { FiFilePlus, FiLogOut } from 'react-icons/fi'
import { confirmAlert } from 'react-confirm-alert'; 
import { TbDiamonds } from 'react-icons/tb'
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
// import './react-confirm-alert.css'
export default function Head({title}){
    const history = useHistory();
    const[nome,setNome] = useState();
    const[quant,setQuant] = useState();
    const[dados,setDados] = useState([]);
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
    // useEffect(()=>{

    //         verificarsession();
    // },[])
    // function verificarsession(){
    //     let session =JSON.parse(sessionStorage.getItem("session")|| "[]");
    //     console.log(session.nome);
    //     setDados(session);

    //     if(dados.length>0){
    //     setNome(session.nome);
    //     }else{
    //         alert("você não tem autorização para acessar esse modulo")
    //     } 
    // }
    
    // function Redirect(){
    //     let novolink = console.log(window.location.href);
    //     novolink.substr()
    // }
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