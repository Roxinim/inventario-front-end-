import React  from "react";
// { useState }
import Logon from "./pages/logon";
import Dashboard from "./pages/dashboard";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserList from "./pages/users/userlist";
import SignIn from "./pages/users/sign-in";
import UserEdit from "./pages/users/edit";
import EnterprisesList from "./pages/enterprises/list";
import EnterprisesSignIn from "./pages/enterprises/sign-in";
import EnterprisesEdit from "./pages/enterprises/edit";
import Patrimony from "./pages/patrimony/list";
import PatrimonySignIn from "./pages/patrimony/sign-in";
import PatrimonyEdit from "./pages/patrimony/edit";
import Sector from "./pages/sector/list";
import SectorSignIn from "./pages/sector/sign-in";
import SectorEdit from "./pages/sector/edit";
import Stocking from "./pages/stocking/list";
import StockingEdit from "./pages/stocking/edit";
import StockingSignIn from "./pages/stocking/sign-in";
// import useToken from "./components/useToken";
// function setToken(userToken){
//     sessionStorage.setItem('token',JSON.stringify(userToken));
// }
// function getToken(){
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// }
function Routes(){
    // const { token, setToken } = useToken();
    // if (!token){
    //     return <Logon setToken={setToken}/>
    // }
    // const token = getToken();
    return(
        
        <BrowserRouter> 
            <Switch>
                <Route component={Logon} exact path="/" />
                <Route component={Dashboard} path="/dashboard" />
                <Route component={UserList} path="/userlist" />
                <Route component={SignIn} path="/sign-in"/>
                <Route component={UserEdit} path="/edit-user/:id"/>
                <Route component={EnterprisesList} path="/enterprises"/>
                <Route component={EnterprisesSignIn} path="/enterprises-sign-in"/>
                <Route component={EnterprisesEdit} path="/enterprises-edit/:id"/>

                <Route component={Patrimony} path="/patrimony"/>
                <Route component={PatrimonySignIn} path="/patrimony-sign-in"/>
                <Route component={PatrimonyEdit} path="/patrimony-edit/:id"/>
                <Route component={Sector} path="/sector"/>
                <Route component={SectorSignIn} path="/sector-sign-in"/>
                <Route component={SectorEdit} path="/sector-edit/:id"/>
                <Route component={Stocking} path="/stocking"/>
                <Route component={StockingSignIn} path="/stocking-sign-in"/>
                <Route component={StockingEdit} path="/stocking-edit/:id"/>

            </Switch>
        </BrowserRouter>
    )
}
export default Routes;