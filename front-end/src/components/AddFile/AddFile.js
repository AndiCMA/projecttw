import React, {useState} from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './AddFile.css';
import {Container,Row,Col} from 'react-bootstrap';

const AddFile = () => {
  
    const id = localStorage.getItem("id");
    const url ="";
    const [name,setName]=useState();
    const [category,setCategory]=useState();
    const [date,setDate]=useState();
    const [file, setFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setIsFilePicked(true);
		setFile(event.target.files[0]);
	};
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(name===""){
            toast.error("Vă rugăm să vă completați numele!");
            return;
        }
        if(category===""){
            toast.error("Vă rugăm să vă completați categoria!");
            return;
        }
        if(isFilePicked==false){
            toast.error("Vă rugăm să vă incărcați fișierul!");
            return;
        }

        let formData  = new FormData();
		formData.append("id", id);
		formData.append("name", name);
		formData.append("category", category);
		formData.append("file", file);

        var url = "http://localhost:8080/addFile";
        var config = {     
            headers: {'content-type': 'multipart/form-data' },
        }

        try {
            const response = await axios.post(url , formData);
            
            if (response.data){
                toast.success('Fisier-ul "'+name+'" a fost adaugat cu succes!');
                setName("");
                setDate("");
                setCategory("");
                setFile();
                setIsFilePicked(false);
            }
        }catch(err){
            toast.error("Fisier-ul nu a fost adaugat! Va rugam incercati mai tarziu");
            console.warn(err);
        }

    }

    return (
        <div><Header/>
            <Container>
                <Row>
                    <Col 
                    sm={6} 
                    className="mx-auto">
                        <form id="FileForm" onSubmit={handleSubmit}>
                        <h1 className="title mb-4">Adaugare fisier</h1>

                        <input
                            type="text"
                            className = "form-control  my-2"
                            placeholder="Nume"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            className = "form-control  my-2"
                            placeholder="Categorie"
                            name="categorie"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                            <input
                                type="file"
                                name="file"
                                className="form-control my-2"
                                onChange={changeHandler}
                                title = "Alege un fisier"
                            />
                            <input
                                type="submit"
                                value="Adauga fisier"
                                className="btn btn-primary  mt-2"
                            />
                        </form>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default AddFile;