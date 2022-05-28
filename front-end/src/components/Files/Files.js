import React, {useState,useEffect} from 'react';
import axios from 'axios'
import './Files.css'
import fileDownload from 'react-file-download';

import { ToastContainer, toast } from "react-toastify";

import {Table, Toast} from 'react-bootstrap'
import Header from '../Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ListGroups =()=> {
    const id = localStorage.getItem("id");
    const [files,setFiles] = useState([]);

    useEffect(()=>{
        try{
            axios.get('http://localhost:8080/getFiles'+"/"+id)
            .then(response=>setFiles(response.data))
            .then(error=>console.log(error));
        }catch(err){
            console.error(err.response);
        }
    },[]);


    const onnChange =(e)=>{
        axios.get('http://localhost:8080/getFiles'+"/"+id)
        .then(response=>setFiles(response.data))
        .then(error=>console.log(error));
    };
    
    const downloadFile =(e,fileId)=>{
        try{
            axios.get('http://localhost:8080/downloadFileName'+"/"+fileId+"/"+id,)
            .then(response1 => {
                toast.info('Decarcare fisier "' + response1.data + '"');
                try{
                    axios.get('http://localhost:8080/downloadFile'+"/"+fileId+"/"+id, {
                    responseType: 'blob'
                    })
                    .then(response => {
                        fileDownload(response.data,response1.data);
                    })
                }catch(err){
                    toast.error("Fisierul nu a putut fi descarcat. Server error");
                }
            })
        }catch(err){
            toast.error("Fisierul nu a putut fi descarcat. Server error");
        }
    };
    
    const deleteFile =(e,fileId)=>{

        axios.delete('http://localhost:8080/deleteFilebyId'+"/"+fileId+"/"+id)
        .then(()=>{
            axios.get('http://localhost:8080/getFiles'+"/"+id)
            .then(response=>setFiles(response.data))
            .then(error=>{if(error){console.log(error)}});
            console.log("deleted")
            toast.info('Fisier sters cu succes');
        })
        .then(
            error=>{if(error){console.log(error)}}
        );
    };

    return(
        <div><Header />
            <Container>
                    
                        <h1 className="display-4">Fisierele mele</h1>

                        <button class="btn btn-primary" onClick={(e)=>{onnChange(e)}}> Update fortat</button>
            
                        <div class="tableContainer">
                            <Table hover="true" id="tableFiles">
                                <thead> 
                                    <tr className='header'>
                                        <td>Nume</td>
                                        <td>Categorie</td>
                                        <td>Data upload</td>
                                        <td>Download</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file) => (
                                        <tr key={file.id} className='items'>
                                            <td>{file.name}</td>
                                            <td>{file.category}</td>
                                            <td>{file.data}</td>
                                            <td>
                                                <button class="btn btn-primary" onClick={(e) => {downloadFile(e,file.Fileid)}}> Download</button>
                                                <button class="btn btn-primary mx-1" onClick={(e) => {deleteFile(e,file.Fileid)}}> Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
            <ToastContainer />
            </Container>
        </div>
    )
};


export default ListGroups;