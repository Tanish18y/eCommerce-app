import React, { useState } from "react"
import Login from "./Login"
import Register from "./Register"
import NoMatch from "./NoMatch"
import Dashboard from "./Dashboard"
import { HashRouter, Routes } from "react-router-dom"
import {Route} from "react-router-dom"
import NavBar from "./NavBar"
import { UserContext } from "./UserContext"
import { UserProvider } from "./UserContext"

function App(){
    let [user,setUser]=useState({
        isLoggedIn:false,
        currentUId:null,
        currentUName:null,
    })
    return(
        <UserProvider>
            <HashRouter>
                <NavBar/>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" exact={true} element={<Login/>}/>
                        <Route path="/register"  element={<Register/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                    </Routes>
                </div>        
            </HashRouter>
        </UserProvider>
            
        
        
    );
        
}
export default App