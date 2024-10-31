"use client"
import Link from 'next/link';
import style from './Header.module.css'
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
const
    pages=[
        {href:'/',title: 'Home'},
    ];
    
export default function Header(){
    const [userCookie, setUserCookie] = useState("");
    useEffect(()=>{
        setUserCookie(Cookies.get("auth"));
    },[]);
    
    return <header>
        
            <nav className={style.header}>
                <ul>
                    {pages.map(({href,title})=><li key={href}><Link href={href}>{title}</Link></li>)}
                </ul>
                <div className={style.userSection}>
                    {userCookie?<Link href="/profile">userCookie</Link>:<Link href="/login">login</Link>}           
                </div>
            </nav>
        
        </header>
}