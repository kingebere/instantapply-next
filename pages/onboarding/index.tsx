import { insertToProfile,getSession } from "@/supabase"
import React, { useState,useEffect } from "react"
import { Session } from '@supabase/auth-helpers-react';
export default function Onboarding() {
const [formData,setFormData]=useState({resume_email:"",firstname:"",lastname:"",resume_url:""})
const[user,setUser]=useState<Session|null>()
  // CHECK THAT THE FILE IS PROPER FORMAT (size, type, etc)

  async function handleChange(event: any) {
    console.log(event.target.files[0])
    const fieldName = event.target.name
    console.log(JSON.stringify(event.target.files[0]))
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append("file", file)
    const data = await fetch("/api/upload-pdf", {
      method: "POST",
      mode: "cors",
      body: formData,
      headers: {
        "Content-Type": "application/pdf",
      },
    })
    const res = await data.json()
    setFormData(prev => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: res.url,
    }))
  }


//get user's details
useEffect(()=>{
 async function getUser(){
 const session = await getSession();
 setUser(session)
  }
 getUser()
},[])

//add input values to the formdata state
function updateName(e: { target: { name: any; value: any } }){
  const fieldName = e.target.name
    setFormData(prev => ({
      // Retain the existing values
      ...prev,
      // update the current field
      [fieldName]: e.target.value,
    }))
}


//submit formdata
  async function formSubmit(e: any){
    e.preventDefault()
    const data= await insertToProfile(formData,user);
   }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="/assets/images/Instantapply-logo.png"
              alt="logo"
            />
            InstantApply
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Add Profile
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="resume_email"
                    id="email"
                    value={formData.resume_email}
                    onChange={updateName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={updateName}
                    placeholder="Dave King"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Input CV
                  </label>
                  <input
                    onChange={handleChange}
                    accept="image/*,.pdf"
                    className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="default_size"
                   name="resume_url"
                    type="file"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create a profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
