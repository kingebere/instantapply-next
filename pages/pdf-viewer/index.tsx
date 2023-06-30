import { useRouter } from "next/router"
import React,{useState,useEffect} from "react"


export default function Index(){
    const[pdf,setPdf]=useState<string>()
  const router=useRouter()
    useEffect(()=>{

    },[])

    return (
        <div>
            <iframe src={pdf} width="100%" height="100%"></iframe>
        </div>
    )
}