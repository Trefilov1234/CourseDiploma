'use client'
import style from './page.module.css'
import toast from "react-hot-toast";
import Link from 'next/link';
import { useState} from "react";
import $ from "jquery"
import { fork } from 'child_process';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page()
{
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const formData = new FormData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('image',image);
        formData.append('subject',subject);
        formData.append('description',description);
        console.log(image);
        console.log(formData['image']);
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/createTutorInfo", {
            method: "POST",
            credentials: 'include',
            body: formData,
          });
          console.log(res);
          if (res.status === 200) {
            
            
          } 
        } catch (err) {
          console.log(err);
        }
        finally
        {
          if (res.status === 200)
          {
            window.location.replace('/');
            
          }
          else if (res.status === 401)
          {
            window.location.replace('/login');
          }
          else if(res.status===400)
          {
            toast.error("The data you entered is incorrect")
          }
        }
      };

      const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setImageName(e.target.files[0].name);
        setImage(e.target.files[0]);
        console.log(e.target.files);
    }
    return <>
    <div className={style.back}>
      <Form  onSubmit={handleSubmit} style={{ width: '400px', margin: '100px auto',backgroundColor: 'gray', borderRadius: '12px', paddingLeft: '10px'}}>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Let's create your tutor page!</Form.Label>
        <Form.Group className="mb-3" controlId="subject" style={{width:'360px',margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Subject</Form.Label>
          <Form.Control type="text"  onChange={(e)=>setSubject(e.target.value)} value={subject} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description" style={{width:'360px',margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Description</Form.Label>
          <Form.Control as="textarea"  onChange={(e)=>setDescription(e.target.value)} value={description} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="file" style={{width:'360px',margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Image</Form.Label>
          <Form.Control type="file"  onChange={onFileChange}/>
        </Form.Group>
        <div style={{textAlign:'center',margin:'0 0 20px 0'}}>
          <Button type="submit" size="lg" variant="dark">Create</Button>
        </div>
      </Form>
    </div>
  
  </>
}