'use client'
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import TutorInfo from "../components/TutorInfoCard";
import Stack from 'react-bootstrap/Stack';
import style from './page.module.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {

  let fetcher = async() => {
    const response = await fetch("http://localhost:5262/tutorWebApi/getAllTutorInfos", {
        method: "GET",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        
      });
    if (!response.ok) throw new Error('fetch ' + response.status);
    let jsonRes=await response.json();
    console.log(jsonRes);
    if(jsonRes)
      {
        setIsLoading(false);
        setData(jsonRes);
      }
  };
  const [isLoading,setIsLoading] = useState(true);
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
        <Container style={{ width: 'fit-content', margin: '0 auto',backgroundColor: 'gray', borderRadius: '12px'}} >
          <Row style={{margin: '35px 20px 20px 20px'}}>
            {tutorInfos.map((tutInf,key)=><Col key={key} md="auto" style={{marginBottom:'20px'}}>
                  <TutorInfo key={tutInf.id} subject={tutInf.subject} description={tutInf.description} image={tutInf.image} firstname={tutInf.user.firstName} 
                lastname={tutInf.user.lastName} tutInfId={tutInf.id}/></Col>
              )}
          </Row>
        </Container>
      </div>
      </>
    }
  }