import React,{useState} from 'react'
import '../../../global.css'
import Menu from '../../../components/menu'
import Head from '../../../components/head'
import '../../../components/head/react-confirm-alert.css'
import api from '../../../server/api'
export default function PatrimonySignIn(){

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
            api.post("patrimonios",
            dados,
            {headers:{'Content-Type':'application/json'}}).then(function(response){
                alert("DEU CERTO");
                window.location.href="/patrimony";
            })
        }
    
            // let listaPatrimonio = JSON.parse(localStorage.getItem("cd-patrimonio")||"[]")
            // listaPatrimonio.push(
            //     {
            //         id:Date.now().toString(36)+Math.floor(Math.pow(10,12)+Math.random()*9*Math.pow(10,12)).toString(36),
            //         nome:nome,  
            //     }
            // )
            // localStorage.setItem("cd-patrimonio",JSON.stringify(listaPatrimonio))
            // alert("Cadastro realizado!")
            // window.location.href="/patrimony"
    }
    return(
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Cadastro de Patrimônio" />
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