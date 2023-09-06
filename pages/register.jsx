import Layout from "@/components/Layout/Layout";
import React, {useMemo, useState} from "react";
import { motion } from "framer-motion";
import Input from "@/components/Atom/Input";
import ButtonPrimary from "@/components/Atom/ButtonPrimary";
import ScrollAnimationWrapper from "@/components/Layout/ScrollAnimationWrapper";
import getScrollAnimation from "../utils/getScrollAnimation";
import axios from 'axios'
import {useRouter} from 'next/router'

const register = () => {
  const router = useRouter()
  const [formRegister, setFormRegister] = useState({
    username:"",
    email : "",
    password : "",
  })
  const [matchPassword, setMatchPassword] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const [showKonfirmasi, setshowKonfirmasi] = useState(false)

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const handleChange = (e) => {
    setFormRegister({...formRegister, [e.target.id] : e.target.value})
    console.log('formRegister', formRegister)
  }

  const handleKonfirmasi = (e) => {
    if(e.target.value === formRegister.password) {
      setMatchPassword(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("https://reqres.in/api/register", {
      username: formRegister.username,
      email : formRegister.email,
      password : formRegister.password
    })
    router.push("/home")    
  }
  

  return (
    <Layout>
      <ScrollAnimationWrapper>
      <div
        className="max-w-screen-xl min-h-[87vh] max-h-screen mt-24 px-8 xl:px-16 mx-auto"
        id="about"
      >
        <motion.div className="py-6 sm:py-16"variants={scrollAnimation}>
          <div className="  w-full flex flex-col items-center gap-5 justify-center ">
            <h1 className=" font-bold text-2xl">Daftar Untuk Membuat Akun</h1>
            <p className=" font-light">Sudah mempunyai akun? <span className="font-bold text-orange-600">Login</span></p>
            <form className="w-[40%] bg-grren-200">

              <Input type={"username"} isRequired={true} labelText={"username"} labelFor={"username"} id={"username"} placeholder={"Username"} handleChange={handleChange}/>
              <Input type={"email"} isRequired={true} labelText={"Email"} labelFor={"email"} id={"email"} placeholder={"Masukan email"} handleChange={handleChange}/>
              <Input type={showPassword? "text" : "password"} isRequired={true} labelText={"Password"} labelFor={"password"} id={"password"} placeholder={"Password"} handleChange={handleChange} eyeIcon={true} handleEyeIcon={() => setshowPassword(!showPassword)}/>
              <Input type={showKonfirmasi? "text" : "password"} isRequired={true} labelText={"Konfirmasi Password"} labelFor={"konfirmasi"} id={"konfirmasi"} placeholder={"Konfirmasi Password"} handleChange={handleKonfirmasi} eyeIcon={true} handleEyeIcon={() => setshowKonfirmasi(!showKonfirmasi)} />

              <ButtonPrimary type={"submit"} onClick={handleSubmit}  addClass={matchPassword && formRegister.email !== '' && formRegister.password !== ''?"w-full text-white": "w-full bg-gray-300 text-white"}>Daftar</ButtonPrimary>
            </form>
            
          </div>
        </motion.div>
      </div>
      </ScrollAnimationWrapper>
    </Layout>
  );
};

export default register;
