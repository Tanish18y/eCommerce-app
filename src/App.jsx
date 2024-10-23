import React from "react"
import Login from "./Login"
import Register from "./Register"
import NoMatch from "./NoMatch"
import Dashboard from "./Dashboard"
import { HashRouter, Routes } from "react-router-dom"
import {Route} from "react-router-dom"
import NavBar from "./NavBar"
function App(){
    return(
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
    );
        
}
export default App