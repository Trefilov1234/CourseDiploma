'use client'
import useSWR from "swr";
import Spinner from '../../../components/Spinner';
import photo from "../../../public/Images/noImage.png";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import style from './clientComponent.module.css'
import { Button } from "react-bootstrap";

export default function ClientComponent({id}) {         
let fetcher = async() => {
    const response = await fetch("http://localhost:5262/tutorWebApi/GetTutorInfoById/"+id, {
        method: "GET",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        
      });
    if (!response.ok) throw new Error('fetch ' + response.status);
    let res=await response.json();
    console.log(res);
    return res;
  };
  const getCredentials = async () => {

    console.log("haha");
    let res;
    try {
      res = await fetch("http://localhost:5262/tutorWebApi/getUserCredentials", {
        method: "GET",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        
      });
      let jsonRes=await res.json();
      console.log(jsonRes)
      if(jsonRes)
      {
        setCreds(jsonRes);
      }
      
    } catch (err) {
      console.log(err);
    }
};
  const [creds, setCreds] = useState(null);
  const {data,error,isLoading,isValidating,mutate}=useSWR("http://localhost:5262/tutorWebApi/GetTutorInfoById/"+id,fetcher);
  useEffect(()=>{
    getCredentials();
  },[]);
  let deleteTutorInfo=async(id)=>
  {
    const response = await fetch("http://localhost:5262/tutorWebApi/deleteTutorInfoById/"+id, {
      method: "GET",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json;charset=utf-8'},
      
    });
    if (!response.ok) throw new Error('fetch ' + response.status);
    if(response.ok)
    {
      window.location.replace('/');
    }
  }
  if(error)
  {
    window.location.replace('/login');
  }

  if(isLoading)
    {
      return <Spinner/>
    }
    else if(data&&creds)
    {
      if(creds.credentials.isBanned)
      {
        window.location.replace('/login');
      }
      let tutorInf=data['tutorInfo'];
      return <>
      <div className={style.back}>
          <Stack direction="horizontal" gap={5} style={{ width: 'fit-content', margin: '50px auto',backgroundColor: 'gray', borderRadius: '12px', display: "flex",flexDirection: "column", paddingLeft: '10px'}}>
            {tutorInf.image?<Image src={"data:image/jpg;base64,"+tutorInf.image} alt="../" thumbnail style={{width:"600px", height:"400px",objectFit: "cover",maxWidth:'100%',margin:'10px 10px'}}/>:
            <Image src={photo.src} alt="../" thumbnail  style={{width:"600px", height:"400px", margin:'10px 10px',objectFit: "cover",maxWidth:'100%'}}/>}
            <div>
              <Form.Group style={{border:'0.5rem solid #535045', borderRadius:'12px',margin: '0.5rem', width:"30rem"}}>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Subject</Form.Label>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem',textAlign: 'center'}}>{tutorInf.subject}</Form.Label>
              </Form.Group>
              <Form.Group style={{border:'0.5rem solid #535045', borderRadius:'12px',margin: '0.5rem', width:"30rem"}}>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Description</Form.Label>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem',textAlign: 'center'}}>{tutorInf.description}</Form.Label>
              </Form.Group>
              <Form.Group style={{border:'0.5rem solid #535045', borderRadius:'12px',margin: '0.5rem', width:"30rem"}}>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Tutor</Form.Label>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem',textAlign: 'center'}}>{tutorInf.user.firstName +" "+tutorInf.user.lastName}</Form.Label>
              </Form.Group>
              <Form.Group style={{border:'0.5rem solid #535045', borderRadius:'12px',margin: '0.5rem', width:"30rem"}}>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Tutor email</Form.Label>
                <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem',textAlign: 'center'}}>{tutorInf.user.email}</Form.Label>
              </Form.Group>
              {creds.credentials.login==tutorInf.user.login?<div className="d-grid gap-2">
                <Button variant="danger" size="lg" onClick={function(){deleteTutorInfo(tutorInf.id)}} style={{marginBottom:"10px"}}>Delete</Button>
              </div>:""}
            </div>
            
          </Stack>
        </div>
        </>
    }
}