'use client'
import style from './page.module.css'
import { useState } from "react";
import { redirect } from 'next/navigation';
import toast from "react-hot-toast";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Page() {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;
        let resJson;
        console.log(firstname);
        console.log(lastname);
        console.log(email);
        console.log(login);
        console.log(password);
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/registration", {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
              firstname: firstname,
              lastname: lastname,
              email: email,
              login:login,
              password: password
            }),
          });
          console.log(res);
          resJson = await res.json();
          console.log(resJson);
          if (res.status === 201) {
            setFirstname("");
            setLastname("");
            setEmail("");
            setLogin("");
            setPassword("");
            
          } 
        } catch (err) {
          console.log(err);
        }
        finally
        {
          if (res.status === 201)
          {
            toast.success("You have successfully registered!");
            redirect('/login');
          }
          else if (res.status === 400)
          {
            toast.error("The data you entered is incorrect");
          }
          else if(resJson.error==="login already exists")
          {
            toast.error("login already exists");
          }
          else if(resJson.error==="email already exists")
          {
            toast.error("email already exists");
          }
        }
      };
    return <>
    <div className={style.back}>
      <Form  onSubmit={handleSubmit} style={{ width: '500px', margin: '100px 10px 100px 10px',backgroundColor: 'gray', borderRadius: '12px', paddingLeft: '10px',paddingRight:'10px' }}>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Welcome</Form.Label>
        <Form.Label style={{display:'block', color: 'whitesmoke', fontWeight:'bold', fontSize: '2.2rem',textAlign: 'center'}}>Let's create your account!</Form.Label>
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
          <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </Form.Group>
        <div style={{textAlign:'center',margin:'0 0 20px 0'}}>
          <Button type="submit" size="lg" variant="dark">Register</Button>
        </div>
      </Form>
    </div>
    </>
  }