import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';
import React from 'react';
import './App.css';

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Files from './components/Files/Files'
import AddFile from './components/AddFile/AddFile'
import TestComp from './components/TestComp/TestComp'

function App() {

    localStorage.setItem("afisat",0);
    return (
        <div className='back'>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Login />}></Route>
                    <Route path="/login" exact element={<Login />}></Route>
                    <Route path="/register" exact element={<Register />}></Route>

                    <Route path="/files" exact element={<Files />}></Route>
                    <Route path="/addFile" exact element={<AddFile />}></Route>
                    <Route path="/test" exact element={<TestComp />}></Route>
                </Routes>
            </Router>
        </div>
    );
}


export default App;

