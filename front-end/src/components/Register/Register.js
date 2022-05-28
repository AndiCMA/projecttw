import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Container,Row,Col} from 'react-bootstrap';
import './Register.css'
const Register = () => {
  
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(username===""){
            toast.error("Vă rugăm să vă completați numele!");
            return;
        }
        if(email===""){
            toast.error("Vă rugăm să vă completați emailul!");
            return;
        }
        if(password===""){
            toast.error("Vă rugăm să vă completați parola!");
            return;
        }

        const formValues={
            username,
            email,
            password
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/addUser",formValues
            );

            if (response.data){
                toast.success("Inregistrare cu succes!");
                navigate("/");
            }
        }catch(err){
            console.warn(err);
            toast.error(err.response.data.message);
        }

        
    }
    return (
        <Container className="height-100vh">
            <Row>
                <Col 
                sm={6} 
                className="mx-auto">
                    <form id="FormLogin" onSubmit={handleSubmit}>
                        <h1 className="title display-4 mb-5">Register</h1>

                        <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className = "form-control  my-2"
                        />

                        <input
                        type="text"
                        placeholder="Email"
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className = "form-control  my-2"
                        />

                        <input
                        type="password"
                        placeholder="Password"
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className = "form-control mt-2  mb-3"
                        />

                        <input
                        type="submit"
                        value="Register"
                        className="btn btn-primary"
                        />

                        <span> OR</span> 

                        <a class="btn btn-primary" href='/'>Login</a>
                    </form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;