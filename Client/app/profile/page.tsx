'use client'
import style from './page.module.css'
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import Spinner from '../../components/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [creds, setCreds] = useState(null);
    const [loginFromCookie,setLoginFromCookie]=useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      let res;
      let jsonRes;
      try {
        res = await fetch("http://localhost:5262/tutorWebApi/changeUser", {
          method: "POST",
          credentials: 'include',
          headers: { 'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({
            login:login,
            password:password,
            email:email,
            firstname:firstname,
            lastname:lastname
          }),
        });
        jsonRes=await res.json();
        console.log(res);
        if (res.status === 200) {
          setLogin("");
          setEmail("");
          setFirstname("");
          setLastname("");
          setPassword("");
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
        else if (res.status === 400)
        {
          toast.error("The data you entered is incorrect");
        }
        else if(jsonRes.error==="login already exists")
        {
            toast.error("login already exists");
        }
        else if(jsonRes.error==="email already exists")
        {
              toast.error("email already exists");
        }
        
      }
    };
    const getUserCredentials = async () => {
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/getUserCredentials", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          }).then(response=>response.json()).then(data=>{
            const fetchData = async () => {
                getUser(data.credentials.login);
             }
            fetchData();
            console.log(data);
          });
        } catch (err) {
          console.log(err);
        }
    };
    const getUser = async (login) => {
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/getUser/"+login, {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          }).then(response=>response.json()).then(data=>{
            setLogin(data.login);
            setEmail(data.email);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setCreds(data);
            console.log(data);
          });
        } catch (err) {
          console.log(err);
        }
    };
    useEffect(()=>{
        const fetchData = async () => {
            await getUserCredentials();
         }
        fetchData();   
    },[]);
    
        
    
    return <>
    <div className={style.back}>
      <Form  onSubmit={handleSubmit} style={{ width: '500px', margin: '100px auto',backgroundColor: 'gray', borderRadius: '12px', paddingLeft: '10px',paddingRight: '10px' }}>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Let's change your credentials!</Form.Label>
        <Form.Group className="mb-3" controlId="first name" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>First name</Form.Label>
          <Form.Control type="text"  onChange={(e)=>setFirstname(e.target.value)} value={firstname} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="last name" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Last name</Form.Label>
          <Form.Control type="text"   onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
        </Form.Group>
        <Form.Group className="mb-3"  controlId="email" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Email</Form.Label>
          <Form.Control type="text" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="login" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Login</Form.Label>
          <Form.Control type="text" onChange={(e)=>setLogin(e.target.value)} value={login} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Password</Form.Label>
          <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </Form.Group>
        <div style={{textAlign:'center',margin:'0 0 20px 0'}}>
          <Button type="submit" size="lg" variant="dark">Change</Button>
        </div>
      </Form>
    </div>
  </>
    }

