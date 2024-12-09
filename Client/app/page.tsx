'use client'
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import TutorInfo from "../components/TutorInfoCard";
import Stack from 'react-bootstrap/Stack';
import style from './page.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Page() {

  let fetcher = async() => {
    setQuery("");
    const response = await fetch("http://localhost:5262/tutorWebApi/getAllTutorInfos", {
        method: "GET",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        
      });
      if(response.status==404)
        {
          window.location.replace('/login');
        }
    if (!response.ok) throw new Error('fetch ' + response.status);
    let jsonRes=await response.json();
    console.log(jsonRes);
    if(jsonRes)
      {
        setIsLoading(false);
        setData(jsonRes);
      }
  };
  let searchFunc=async()=>
  {
    if(query=="")
    {
      return;
    }
    const response = await fetch("http://localhost:5262/tutorWebApi/getTutorInfoByQuery/"+query, {
      method: "GET",
      credentials: 'include',
      headers: { 'Content-Type': 'application/json;charset=utf-8'},
      
    });
    
    if(response.status==404)
    {
      window.location.replace('/login');
    }
  if (!response.ok) throw new Error('fetch ' + response.status);
  let jsonRes=await response.json();
  console.log(jsonRes);
  if(jsonRes)
    {
      setIsLoading(false);
      setData(jsonRes);
    }
  }

 
  const [isLoading,setIsLoading] = useState(true);
  const [query,setQuery] = useState("");
  const [data,setData] = useState(true);
  useEffect(()=>{
    fetcher();
  },[]);
  if(isLoading)
    {
      return <Spinner/>
    }
    else if(data)
    {
      let tutorInfos=data['tutorInfos'];
      console.log(tutorInfos);
      return <>
      <div className={style.back}>
        <div style={{width:'fit-content'}}>
        <InputGroup style={{marginBottom:'10px'}}>
          <Form.Control
            placeholder="search"
            aria-label="search"
            onChange={(e)=>setQuery(e.target.value)} value={query}
          />
          <Button onClick={searchFunc}>Search</Button>
          <Button onClick={fetcher}>Reset</Button>
        </InputGroup>
        <Container style={{ width: 'fit-content', margin: '0 auto',backgroundColor: 'gray', borderRadius: '12px',paddingTop:'10px'}} className={style.cont} >
          <Row style={{margin: '35px 20px 20px 20px'}}>
            {tutorInfos.map((tutInf,key)=><Col key={key} md="auto" style={{marginBottom:'20px'}}>
                  <TutorInfo key={tutInf.id} subject={tutInf.subject} image={tutInf.image} firstname={tutInf.user.firstName} 
                lastname={tutInf.user.lastName} tutInfId={tutInf.id}/></Col>
              )}
          </Row>
        </Container>
        </div>
      </div>
      </>
    }
  }