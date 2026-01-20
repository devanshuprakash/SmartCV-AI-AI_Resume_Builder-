import React,{useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import { useEffect } from 'react';
import { ArrowLeftIcon } from 'lucide-react';

const ResumeBuilder = () => {
  const {resumeId}= useParams();  
  const [resumeData, setResumeData] = useState({
    _id:'',
    title:'',
    personal_info:{},
    experience:[],
    education:[],
    project:[],
    skills:[],
    template:'classic',
    accent_color:'#3B82F6',
    pblic:false,
  });

  const loadExistingResume = async ()=>{
    const resume = dummyResumeData.find(resume=> resume._id === resumeId);
    if(resume){
      setResumeData(resume);
      document.title=resume.title;
    }
  }
  useEffect(()=>{
    loadExistingResume();
  },[]);
  
  return (
    <div>
      <div>
        <Link to={'/app'}>
          <ArrowLeftIcon className='size-4'/>Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* {left panel} */}
      <div></div>

      {/* {right panel} */}
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder  