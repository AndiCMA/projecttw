import React, {useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import {Container,Row,Col} from 'react-bootstrap';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const history=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValues = {
        email,
        parola,
        };
        //console.log(formValues);
        try {
            if (email === "") {
                toast.error("Introduceti email-ul!");
                return;
            }
            if (!/([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/g.test(email) ) {
                toast.error("Formatul email-ului nu este valid!");
                return;
            }
            if (parola === "") {
                toast.error("Introduceti parola!");
                return;
            }

            const response = await axios.post(
                "http://localhost:8080/login/",formValues
            );

            if (response.data && response.data.login === true) {
                localStorage.setItem("id", response.data.user.id);
                history("/files");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message);
            console.warn(err);
        }
    };

    return (
        <Container className="height-100vh">
            <Row>
                <Col 
                sm={6} 
                className="mx-auto">
                    <form id="FormLogin" className="container" onSubmit={handleSubmit}>
                        <h1 className="title display-4 mb-5">Login</h1>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className = "form-control  my-2"
                        />

                        <input
                            type="password"
                            placeholder="Parola"
                            name="parola"
                            value={parola}
                            onChange={(e) => setParola(e.target.value)}
                            className = "form-control  mt-2 mb-3"
                        />

                        <input
                            type="submit"
                            value="Login"
                            className="btn btn-primary"/>

                        <span> OR </span> 

                        <a class="btn btn-primary" href='/register'>Register</a>
                    </form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;