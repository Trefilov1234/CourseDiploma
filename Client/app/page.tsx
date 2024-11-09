'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";
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
    let res=await response.json();
    console.log(res);
    return res;
  };
  const {data,error,isLoading,isValidating,mutate}=useSWR('http://localhost:5262/tutorWebApi/getAllTutorInfos',fetcher);
  
  if(isLoading)
    {
      return <Spinner/>
    }
    else if(data)
    {
      let images=data['images'];
      console.log(images);
      let tutorInfos=data['tutorInfos'];
      console.log(tutorInfos);
      return <>
      <Stack direction="horizontal" gap={3}>
      {tutorInfos.map((tutInf)=>
            <TutorInfo key={tutInf.id} subject={tutInf.subject} description={tutInf.description} image={images.find((el)=>el.tutorInfoId==tutInf.id)} firstname={tutInf.user.firstName} 
          lastname={tutInf.user.lastName} tutInfId={tutInf.id}/>
        )}
      </Stack>
      </>
    }
  }