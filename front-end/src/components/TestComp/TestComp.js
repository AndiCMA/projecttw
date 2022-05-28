import React, {useState} from 'react';
import axios from 'axios'
import {Table, Toast} from 'react-bootstrap'
import Header from '../Header/Header';
import fileDownload from 'react-file-download';

const TestComp =()=> {
    const id = localStorage.getItem("id");
    const [data,setData] = useState("");


    const onnChange =(e)=>{
        axios
        .get('http://localhost:8080/test'+"/"+id, {
          responseType: 'blob'
        })
        .then(response => {
          fileDownload(response.data, "burpee_orig.gif");
        })

        console.log(data);
    };


    return(
        <div>
            <button onClick={(e)=>{onnChange(e)}}> Update</button>
            <p>
            {data}
            </p>
        </div>
    );
}

export default TestComp;