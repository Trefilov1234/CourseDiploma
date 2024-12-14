'use client'
import style from './page.module.css'
import { useState } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await fetch("http://localhost:5262/tutorWebApi/login", {
        method: "POST",
        credentials: 'include',
        headers: { 'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
          login:login,
          password: password
        }),
      });
      if (res.status === 200) {
        setLogin("");
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
      else if (res.status === 404)
        {
          toast.error("You have been blocked");
        }
    }
  };

  return <>
  <div className={style.back}>
      <Form  onSubmit={handleSubmit} style={{ width: '400px', margin: '100px auto',backgroundColor: 'gray', borderRadius: '12px', paddingLeft: '10px',paddingRight: '10px' }}>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Welcome</Form.Label>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Let's log in to your account!</Form.Label>
        <Form.Group className="mb-3" controlId="login" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Login</Form.Label>
          <Form.Control type="text"  onChange={(e)=>setLogin(e.target.value)} value={login} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwrod" style={{margin: '0px 10px'}}>
          <Form.Label style={{color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem'}}>Password</Form.Label>
          <Form.Control type="password"   onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </Form.Group>
        <div style={{textAlign:'center',margin:'0 0 20px 0'}}>
          <Button type="submit" size="lg" variant="dark">Log in</Button>
        </div>
        <Link style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '1.2rem',textAlign: 'center', textDecoration:'none'}} href={'/registration'}>Don't you have an account?</Link>
      </Form>
    </div>
  </>
  }