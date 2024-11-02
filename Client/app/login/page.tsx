'use client'
import style from './page.module.css'
import { useState } from "react";
import toast from "react-hot-toast";
import Link from 'next/link';
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
      console.log(res);
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
    }
  };

  return <>
  <div className={style.back}>
      <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>Welcome</div>
          <div className={style.subtitle}>Let's login to your account!</div>
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
          <button className={style.submit} type="submit">Login</button>
          <div className={style.noAcc}><Link href="/registration" className={style.noAccLink} >Don't you have an account?</Link></div>
      </form>
  </div>
  </>
  }