'use client';
import {useState,useEffect} from'react';

import Feed from '@components/feed'

export default function Home() {

  const[introDone,setIntroDone] = useState(false);
  const[addClass,setAddClass] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setIntroDone(true);
    },3000);
    setTimeout(()=>{
      setAddClass(true);
    },2000);
  },[])

  if(!introDone){
    return<div className={addClass?'intro-div translated':'intro-div'}><h1 className='phaser'>
   Phraser-Tech<hr className='h'></hr></h1></div>
  }
  else{
    return (


      <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Phraser Tech is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
  
      <Feed />
    </section>
    )
  }
 
}
