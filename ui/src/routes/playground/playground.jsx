import React from 'react';
import { useParams } from 'react-router-dom';
import ChatForm from '../../components/chatForm/chatForm';

function Playground() {
  const { chatId } = useParams();

  return (
    <div className="flex flex-1 flex-col items-center">
      {!chatId ? <Default /> : <h1>{chatId}</h1>}
    </div>
  );
}

function Default() {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className="flex-1"></div>
      <ChatForm />
    </div>
  )
}

export default Playground;
