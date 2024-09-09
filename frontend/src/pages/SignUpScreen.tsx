import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

function SignUpScreen(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retypePassword: ""
    })
    
    function handleFormInput(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    function isValidEmail(email: string): boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async function handleSubmit(){
        if (form.firstName === "" || form.lastName === "" || form.email === "" || form.password === "" || form.retypePassword === ""){
            toast.error("Please fill in all fields");
            return;
        }

        if (!isValidEmail(form.email)) {
            toast.error("Invalid email address");
            return;
        } 

        if (form.password !== form.retypePassword){
            toast.error("Passwords do not match");
            return;
        }

        let payload = {
            "username": form.email,
            "password": form.password,
        }

        let response = await axios.post("http://localhost:8080/register", payload);
        if (response.status === 200){
            toast.success("Sign up successful");
            navigate("/login");
        }else{
            toast.error("Sign up failed");
        }
        
    }
    
    return (
        <>
            <div className='size-full flex flex-col justify-center items-center background'>
                <div className='flex flex-col items-center gap-8 p-10 bg-white rounded-lg p-10 w-96'>
                    <div className="m-5 w-full flex items-center justify-center">
                        <h1 className="text-2xl font-mono">Sign Up</h1>
                    </div>
                    <div className="flex flex-row justify-between gap-6">
                            <input name="firstName" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="First Name" type="text"/>
                            <input name="lastName" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="Last Name" type="text"/>
                    </div>
                    <input name="email" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="E-mail address" type="text"/>
                    <input name="password" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="Password" type="password"/>
                    <input name="retypePassword" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="Re-type Password" type="password"/>
                    <input className="h-10 rounded bg-[#1e3e5a] w-full text-white cursor-pointer hover-effect" onClick={handleSubmit} type="submit"/>
                    <p className="text-sm ">Already have an account?<Link className="text-[#1e3e5a] hover:underline hover:cursor-pointer" to="/login"> Login</Link></p>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default SignUpScreen;