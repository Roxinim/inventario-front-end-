import React from 'react'
import './style.css'
import '../../global.css'
import Menu from '../../components/menu'
export default function Dashboard(){
    return( 
        <div className='dashboard-container'>
            <Menu/>
            <div className='principal'>
                <h1>Principal</h1>
            </div>
        </div>

)
}