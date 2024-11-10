'use client'
import { useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import TutorInfo from "../components/TutorInfoCard";
import Stack from 'react-bootstrap/Stack';

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
      <Stack direction="horizontal" gap={3}>
      {tutorInfos.map((tutInf)=>
            <TutorInfo key={tutInf.id} subject={tutInf.subject} description={tutInf.description} image={tutInf.image} firstname={tutInf.user.firstName} 
          lastname={tutInf.user.lastName} tutInfId={tutInf.id}/>
        )}
      </Stack>
      </>
    }
  }