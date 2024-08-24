import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function LoginScreen(){

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    
    function handleFormInput(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    function isValidEmail(email: string): boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }



    function handleSubmit(){

        // if (form.email === "" || !isValidEmail(form.email)){
        //     console.log(form)
        //     toast.error("Please enter the e-mail address");
        //     return;
        // }
        // if (form.password === ""){
        //     toast.error("Please enter the password");
        //     return;
        // }
        navigate("/")
    }
      
    return (
        <>
            <div className='size-full flex flex-col justify-center items-center background'>
                <div className='flex flex-col items-center gap-10 p-10 bg-white rounded-lg p-10 w-96'>
                    <div className="m-5 w-full flex items-center justify-center">
                        <h1 className="text-2xl">Login</h1>
                    </div>
                    <input name="email" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="E-mail address" type="text" value={form.email}/>
                    <input name="password" className="h-8 w-full border-b-2 border-gray-600 px-3 outline-none text-base" onChange={handleFormInput} placeholder="Password" type="password" value={form.password}/>
                    <button className="h-10 rounded bg-[#1e3e5a] w-full text-white cursor-pointer hover:opacity-95" onClick={handleSubmit}>Submit</button>
                    <p className="text-sm ">Don't have an account?<Link className="text-[#1e3e5a] hover:underline hover:cursor-pointer" to="/signUp"> Sign up</Link></p>
                </div> 
            </div>
            <ToastContainer />
        </>
    )
}

export default LoginScreen;