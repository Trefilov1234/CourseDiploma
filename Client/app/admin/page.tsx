'use client'
import useSWR from "swr";
import Spinner from '../../components/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import style from './page.module.css'
export default function AdminPanel() { 

    let fetcher = async() => {
        const response = await fetch("http://localhost:5262/tutorWebApi/getUsers/", {
            method: "GET",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
        if (!response.ok) throw new Error('fetch ' + response.status);
        let res=await response.json();
        
        res=res.users.sort((a,b)=>(a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
        console.log(res);
        return res;
      };
    const {data,error,isLoading,isValidating,mutate}=useSWR("http://localhost:5262/tutorWebApi/getUsers/",fetcher);

    let banOrUnbanUser=async(id)=>
    {
        const response = await fetch("http://localhost:5262/tutorWebApi/banOrUnbanUserById/"+id, {
            method: "POST",
            credentials: 'include',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            
          });
        if (!response.ok) throw new Error('fetch ' + response.status);
        if(response.ok)
            window.location.replace('/admin');
    }
    if(error)
    {
          window.location.replace('/login');
    }
    if(isLoading)
    {
        return <Spinner/>
    }
    else if(data)
    {
        
                return <>
                <Table striped bordered hover>
            <thead>
                <tr>
                <th>Login</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user,key)=><tr key={key}>
                    <td>{user.login}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td><Button variant="dark" onClick={function(){banOrUnbanUser(user.id)}}>{user.isBanned?"Unban": "Ban"}</Button></td>
                </tr>)}
            </tbody>
            </Table>
        </>
        
    }
}