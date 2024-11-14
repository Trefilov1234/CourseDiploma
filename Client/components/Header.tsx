"use client"
import Link from 'next/link';
import style from './Header.module.css'
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import useSWR from "swr";
import Spinner from './Spinner';
import useSWRImmutable from 'swr/immutable'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const
    pages=[
        {href:'/',title: 'Home'},
        {href:'/createTutorPage',title: 'Create tutor page'}
    ];
    
export default function Header(){

    let fetcher = async() => {
        const response = await fetch("http://localhost:5262/tutorWebApi/getUserCredentials", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
        if (!response.ok) throw new Error('fetch ' + response.status);
        return await response.json();
      };
    const [userCookie, setUserCookie] = useState("");
    const [creds, setCreds] = useState(null);
    const [credsGot,setCredsGot]=useState(false);
    const [isLoading,setIsLoading] = useState(true);
    /*const {data,error,isLoading,isValidating,mutate}=useSWR('http://localhost:5262/tutorWebApi/getUserCredentials',fetcher,{revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,});*/

    const getCredentials = async () => {
        setIsLoading(true);
        console.log("haha");
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/getUserCredentials", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
          let jsonRes=await res.json();
          if(jsonRes)
          {
            setIsLoading(false);
            setCreds(jsonRes);
          }
          
        } catch (err) {
          console.log(err);
        }
    };
    useEffect(()=>{
      getCredentials().then(()=>setUserCookie(Cookies.get("auth")));
    },[]);
    
    const logout = async () => {
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/logout", {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
          console.log(res);
          if(res.status===200)
          {
            window.location.replace('/');
          }
        } catch (err) {
          console.log(err);
        }
    };

    return <>
    <Navbar expand="lg" className="bg-body-tertiary" style={{zIndex:'1000',position:'fixed',width:'100%',top:'0'}}>
      <Container>
        <Navbar.Brand href="/">Tutor</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createTutorPage">Create tutor page</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {isLoading? <Nav><Spinner/></Nav>:
          <Nav>
          {userCookie?<Nav><Nav.Link href="/profile">{creds.credentials?creds.credentials.login:""}
          </Nav.Link><Nav.Link onClick={logout}>logout</Nav.Link></Nav>:<Nav.Link href="/login">log in</Nav.Link>}
          </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar></>
}