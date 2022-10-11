import React,{useState} from 'react'
import '../../../global.css'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function SectorSignIn(){
    
    const [nome, setNome] = useState('');
    const [msg, setMsg] = useState('');
    const dados=
    {nome}
    function salvarDados(e){
        e.preventDefault();
        let index=0;
        if(nome.length<3){
          setMsg("O Nome precisa ter 3 caracteres ou mais.")
          index++
        } else if(nome===""){
          setMsg("Preencha os campos!")
          index++
        }
        if (index===0){
            api.post("setores",
                dados,
                {headers:{'Content-Type':'application/json'}}).then(function(response){
                    alert("DEU CERTO");
                    window.location.href="/sector";
            })
            // let listaSetor = JSON.parse(localStorage.getItem("cd-setor")||"[]")
            // listaSetor.push(
            //     {
            //         id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
            //         nome:nome,  
            //     }
            // )
            // localStorage.setItem("cd-setor",JSON.stringify(listaSetor))
            // alert("Cadastro realizado!")
            // window.location.href="/sector"
        }
        
    }
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Cadastro de Setor" />
                <section className='form'>
                    <div className='form-cadastro'>
                        <form onSubmit={salvarDados}>
                        {/* <h1 className='titulo'>Cadastro</h1> */}
                            {/* <img src={Logo}></img> */}
                            {/* <div class="cadastro"> */}
                                <label>Nome</label>
                                <input className="input-sign-in" value={nome} onChange={e=>setNome(e.target.value)} />
                                <p>{msg}</p>
                                <button className='button-login' type='submit'>Salvar</button>
                            {/* </div> */}
                        </form>
                    </div>
                </section>
            </div>
        </div>

)
}