'use client'
import style from './page.module.css'
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import Spinner from '../../components/Spinner';
export default function Page() {

    let fetcher = async() => {
        const response = await fetch("http://localhost:5262/tutorWebApi/getUser", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
          return await response.json();
    };
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [creds, setCreds] = useState(null);
   // const {data,error,isLoading,isValidating,mutate}=useSWR('http://localhost:5262/tutorWebApi/getUser',fetcher);
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
                getUser(data.login);
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
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.title}>Hello</div>
            <div className={style.subtitle}>Let's change your credentials!</div>
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
            <button className={style.submit} type="submit">Change</button>  
        </form>
    </div>
  </>
    }

