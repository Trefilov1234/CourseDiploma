"use client"
import Link from 'next/link';
import style from './Header.module.css'
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import useSWR from "swr";
import Spinner from './Spinner';
import useSWRImmutable from 'swr/immutable'

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

    if(isLoading)
    {
        return <header>
            <nav className={style.header}>
                <ul>
                    {pages.map(({href,title})=><li key={href}><Link href={href}>{title}</Link></li>)}
                </ul>
                <div className={style.userSection}>
                    <Spinner/>
                </div>
            </nav>
        </header>
    }
    else
    {
    return <header>
            <nav className={style.header}>
                <ul>
                    {pages.map(({href,title})=><li key={href}><Link href={href}>{title}</Link></li>)}
                </ul>
                <div className={style.userSection}>
                    {userCookie?<div><Link href="/profile" className={style.profileLink}>{creds.credentials?creds.credentials.login:""}</Link><Link href='#' onClick={logout}>logout</Link></div>:<Link href="/login">login</Link>}           
                </div>
            </nav>
        </header>
    }
}