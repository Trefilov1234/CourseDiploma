'use client'
import useSWR from "swr";
import Spinner from '../../../components/Spinner';
import photo from "../../../public/Images/noImage.png";
import Image from "next/image";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  const {data,error,isLoading,isValidating,mutate}=useSWR('http://localhost:5262/tutorWebApi/getAllTutorInfos'+id,fetcher);

  if(error)
  {
    window.location.replace('/login');
  }

  if(isLoading)
    {
      return <Spinner/>
    }
    else if(data)
    {
      let tutorInf=data['tutorInfo'];
      return (
       <Card style={{ width: '1000px',margin:'0 auto', height:'auto' }}>
        {tutorInf.image?<Card.Img src={"data:image/jpg;base64,"+tutorInf.image} alt="../" />:
        <Card.Img src={photo.src} alt="../" />}
          <Card.Body>
            <Card.Title>{tutorInf.subject}</Card.Title>
            <Card.Text>
              {tutorInf.description}
            </Card.Text>
            <Card.Text>
              {tutorInf.user.firstName +" "+tutorInf.user.lastName}
            </Card.Text>
          </Card.Body>
        </Card>     
        )
    }
}