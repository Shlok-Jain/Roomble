import React,{useEffect, useState} from 'react';
import '../css/MessageBoxStyle/Messages.css';
import MessageBox from './MessageComponents/MessageBox';
import ChatBox from './MessageComponents/ChatBox';
import { useParams } from 'react-router-dom';
import config from '../config.json';
import { toast } from 'react-toastify';

function Messages() {
  const [currentConvId, setCurrentConvId] = useState(null);
  const [somethingwentwrong , setSomethingwentwrong] = useState(false); 
  useEffect(()=>{
      if(somethingwentwrong){
        toast.error('Something went wrong. Please try again later.');
        navigate(-1)
      }
    }, [somethingwentwrong]);
  const [currentMessages, setCurrentMessages] = useState({
    members: ["loading", "loading"],
    messages: [
      {
        senderID: "loading",
        message: "loading",
        timestamp: 123
      }
    ]
  });
  const [currentConversations, setCurrentConversations] = useState([]);

  const params = useParams();
  const id = params.id;

  useEffect(()=>{
    setCurrentConvId(id);
    fetch(`${config.backend}/messages/getConversation`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({conversation_id: id})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success){
        setCurrentMessages(data.conversation);
      }else{
        setSomethingwentwrong(true);
      }
    })


  },[id]);

  return (
    <div className="message-container">
        <MessageBox />
        <ChatBox currentConvId={currentConvId} setCurrentConvId={setCurrentConvId} currentMessages={currentMessages} setCurrentMessages={setCurrentMessages}/>
    </div>
  );
}

export default Messages;
