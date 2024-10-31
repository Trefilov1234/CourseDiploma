'use client'
import style from './page.module.css'
import { useState } from "react";
import { redirect } from 'next/navigation';
import toast from "react-hot-toast";
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
          resJson = await res.json();
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
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.title}>Welcome</div>
            <div className={style.subtitle}>Let's create your account!</div>
            <div className={[style.inputContainer, style.ic1].join(' ')}>
                <input id="firstname" className={style.input} type="text"  onChange={(e)=>setFirstname(e.target.value)} value={firstname}/>
                <div className={style.cut}></div>
                <label htmlFor="firstname" className={style.placeholder}>First name</label>
            </div>
            <div className={[style.inputContainer, style.ic2].join(' ')}>
                <input id="lastname" className={style.input} type="text"  onChange={(e)=>setLastname(e.target.value)} value={lastname}/>
                <div className={style.cut}></div>
                <label htmlFor="lastname" className={style.placeholder}>Last name</label>
            </div>
            <div className={[style.inputContainer, style.ic2].join(' ')}>
                <input id="email" className={style.input} type="text"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <div className={[style.cut, style.cutShort].join(' ')}></div>
                <label htmlFor="email" className={style.placeholder}>Email</label>
            </div>
            <div className={[style.inputContainer, style.ic2].join(' ')}>
                <input id="login" className={style.input} type="text"  onChange={(e)=>setLogin(e.target.value)} value={login}/>
                <div className={[style.cut, style.cutShort].join(' ')}></div>
                <label htmlFor="login" className={style.placeholder}>Login</label>
            </div>
            <div className={[style.inputContainer, style.ic2].join(' ')}>
                <input id="password" className={style.input} type="text"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
                <div className={style.cut}></div>
                <label htmlFor="password" className={style.placeholder}>Password</label>
            </div>
            <button className={style.submit} type="submit">Register</button>
        </form>
    </div>
    </>
  }