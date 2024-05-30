import React, { useEffect, useState } from 'react'
import loader from "../../assets/Infinity@1x-1.0s-200px-200px.gif"

function spinner() {

    const [text,setText] = useState('')
    const [showImage,setShowImage] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setShowImage(false)
            setText(
                <p className='text-red-500'>'I waited 3 seconds to load did you see the spinner'</p>
            )
        },3000)
    },[])
  return (
    <>
    <div>
        {
            showImage?(
                <img src={loader} alt="" />
            ):(
                <h3>{text}</h3>
            )
        }
    </div>
    </>
  )
}

export default spinner