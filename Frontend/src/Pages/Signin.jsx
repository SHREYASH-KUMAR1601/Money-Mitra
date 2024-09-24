import React from 'react'
import Heading from '../Components/Heading'
import InputBox from '../Components/InputBox'
import SubHeading from '../Components/SubHeading'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import BottomWarning from '../Components/BottomWarning'

function Signin() {
    const navigate = useNavigate();
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label = {"Sign In"}/>
            <SubHeading label = {"Enter your credentials to access your account"}/>
            <InputBox label = {"E-mail"} placeholder={"doctorDoe@gmail.com"}/>
            <InputBox label = {"Password"} placeholder={"123456"}/>
            <div className='pt-4'>
            <Button label={"Sign in"} onClick={()=>{
                navigate("/sign-in");
            }}/>
            </div>
            
            <BottomWarning label={"Don't have an account ?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
  )
}

export default Signin