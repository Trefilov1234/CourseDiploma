import Link from 'next/link';
import style from './Header.module.css'
const
    pages=[
        {href:'/',title: 'Home'},
        {href:'/registration',title: 'Registration'},
        {href:'/login',title: 'Login'},
    ];
export default function Header(){
    return <header>
            <nav className={style.header}>
                <ul>
                    {pages.map(({href,title})=><li key={href}><Link href={href}>{title}</Link></li>)}
                </ul>
            </nav>
        </header>
}