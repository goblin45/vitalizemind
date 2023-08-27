import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const Chatbot = () => {
    const [inputText,setInputText]=useState('')
    const [messages,setMessages]=useState([])
   


  const handleSend = () =>{
    if (inputText.trim() !== '') {
    //   setMessages([...messages, inputText]);
      setInputText('');
    }
  }

  return (
    <>
      <div className="chat_background">
             <div className="chat_overlay">
            <div className="response"  style={{  minHeight: '200px', padding: '10px' }}>
           {messages.map((message, index) => (
              <div key={index} className={message}>
                    <h1>{message}</h1> 
          </div>
        ))}
      </div>
            </div>
           
             </div>
             <div className="chat_box">
            <input type="text"
               className="chat_field"
               value={inputText}
               onChange={(e)=>setInputText(e.target.value)}
               placeholder="What's on your mind...."
               />
               <Button className="send_button" onClick={handleSend}>Send</Button>  
               </div>
             </>
   
  )
}


export default Chatbot