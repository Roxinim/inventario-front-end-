import React from 'react'
import './style.css'
import '../../global.css'
import Menu from '../../components/menu'
import Head from '../../components/head'
export default function Dashboard(){
    return( 
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <Head title="Inventário" />
                <p>Este é o Sistema de Inventário, sinta-se livre para navegar pelas listas, cadastrar, excluir, alterar, ou sair!</p>
            </div>
        </div>

)
}