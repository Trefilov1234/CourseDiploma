'use client'
import style from './page.module.css'
import toast from "react-hot-toast";
import Link from 'next/link';
import { useState} from "react";
import $ from "jquery"
import { fork } from 'child_process';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
export default function Page()
{
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    const formData = new FormData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('image',image);
        formData.append('subject',subject);
        formData.append('description',description);
        console.log(image);
        console.log(formData['image']);
        let res;
        try {
          res = await fetch("http://localhost:5262/tutorWebApi/createTutorInfo", {
            method: "POST",
            credentials: 'include',
            body: formData,
          });
          console.log(res);
          if (res.status === 200) {
            
            
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
          else if (res.status === 401)
          {
            window.location.replace('/login');
          }
          else if(res.status===400)
          {
            toast.error("The data you entered is incorrect")
          }
        }
      };

      const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setImageName(e.target.files[0].name);
        setImage(e.target.files[0]);
        console.log(e.target.files);
    }
    return <>
  <div className={style.back}>
      <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.title}>Hello</div>
          <div className={style.subtitle}>Let's create your tutor page!</div>
          <div className={[style.inputContainer, style.ic2].join(' ')}>
              <input id="subject" className={style.input} type="text"  onChange={(e)=>setSubject(e.target.value)} value={subject}/>
              <div className={[style.cut].join(' ')}></div>
              <label htmlFor="subject" className={style.placeholder}>Subject</label>
          </div>
          <div className={[style.inputContainer, style.ic2].join(' ')}>
              <input id="description" className={style.input} type="text"  onChange={(e)=>setDescription(e.target.value)} value={description}/>
              <div className={style.cut}></div>
              <label htmlFor="description" className={style.placeholder}>Description</label>
          </div>
          <label className={style.inputFile}>
            <input type="file" name="file" onChange={onFileChange}/>
            <span className={style.inputFileBtn}>Choose a file</span>           
            <span className={style.inputFileText}>{imageName}</span>
          </label>
          <button className={style.submit} type="submit">Create</button>
      </form>
  </div>
  </>
}