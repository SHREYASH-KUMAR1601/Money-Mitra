import React from 'react'
import Heading from '../Components/Heading'
import InputBox from '../Components/InputBox'
import SubHeading from '../Components/SubHeading'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import BottomWarning from '../Components/BottomWarning'

function Signup() {
    const navigate = useNavigate();
    return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign up"} onClick={()=>{
            navigate("/dashboard");
          }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/sign-in"} />
      </div>
    </div>
  </div>
    )
}
export default Signup