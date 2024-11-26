import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatForm from '../../components/chatForm/chatForm';
import { FaArrowDownLong } from "react-icons/fa6";
import AiImage from "../../assets/image.png";
import SyncLoader from "react-spinners/SyncLoader";
import CodeEditor from '../../components/codeEditor/codeEditor';
import Split from 'react-split'
import "./split.css"
const DEFAULT = {
  id: '',
  content: '',
  created_at: '',
};

function Playground() {
  const { chatId } = useParams();
  const [chat, setChat] = useState({ messages: [] });
  const chatAreaRef = useRef(null);
  const [hasScrolledToTop, setHasScrolledToTop] = useState(false);
  const [displayResponse, setDisplayResponse] = useState(DEFAULT);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [count, setCount] = useState(0); // Used to trigger useEffect
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState({
    html: '',
    css: '',
    js: '',
  });

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }

  const handleOnScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatAreaRef.current;
    const offset = 7;
    const hasScrolledToTop = scrollHeight - scrollTop >= clientHeight + offset;
    setHasScrolledToTop(hasScrolledToTop);
  }

  useEffect(() => {
    if (displayResponse.content !== DEFAULT.content) {
      setIsTyping(true);
      let i = 0;
      const fullContent = displayResponse.content;  // Store the full response content
      const intervalId = setInterval(() => {
        setDisplayResponse(prev => ({ ...prev, content: fullContent.slice(0, i) }));
        i++;
        if (i > fullContent.length) {
          setIsTyping(false);
          clearInterval(intervalId)
        };
      }, 20);
      return () => clearInterval(intervalId);
    }
  }, [count]);

  const onSubmit = async () => {
    if (prompt) {
      const userMessage = {
        id: Math.floor(Math.random() * 1000).toString(),
        content: prompt,
        type: 'user',
        created_at: new Date().toLocaleTimeString(),
      };

      setChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, userMessage],
      }));
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/chats/${chatId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input: prompt }),
        });

        const data = await res.json();
        setIsLoading(false);
        setCount(count + 1);
        setDisplayResponse(data.message);
        setChat(prevChat => ({
          ...prevChat,
          messages: [...prevChat.messages, data.message],
        }));
        setCode(data.code);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setPrompt('');
      }
    }
  };

  useEffect(() => {
    const fetchChat = async () => {
      if (chatId) {
        const res = await fetch(`http://localhost:8080/chats/${chatId}`);
        const data = await res.json();
        setChat(data);
        setCode(data.code);
      }
    }
    fetchChat();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  return (
      <Split className='flex items-center w-full  h-screen'>

        {!chatId ? (
          <Default />
        ) : (
          <div className="flex w-full flex-1 flex-col h-full pt-16 bg-white min-w-[40%]">
            {/* Scrollable chat area */}
            <div ref={chatAreaRef} className="flex-1 relative overflow-y-auto scroll-smooth pt-4" onScroll={handleOnScroll}>
              <div className="text-gray-800 leading-relaxed flex flex-col flex-1 gap-2 max-w-[75%] pb-4 m-auto">
                {/* Render messages */}
                {chat.messages?.map((message, i) => (
                  <div key={message.id} className="flex gap-2">
                    <img
                      src={message.type === "ai" ? AiImage : "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
                      alt=""
                      className="w-8 mt-2 h-8 rounded-full"
                    />
                    <div className={`flex flex-col ${message.type === 'ai' ? "bg-gray-100" : ""} p-2 rounded-lg`}>
                      <p className='inline'>
                        {i === chat.messages.length - 1 && displayResponse.content ? displayResponse.content : message.content}
                        {isTyping && i === chat.messages.length - 1 && (
                          <span className='px-1'>
                            <span className="inline-block bg-black ml-3 animate-blink">.</span>
                          </span>
                        )}
                      </p>
                      {isLoading && i === chat.messages.length - 1 && (
                        <SyncLoader color="#000" size={8} margin={2} />
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
            {/* Chat input form */}
            <div className='relative'>
              {hasScrolledToTop && (
                <button
                  className='absolute -top-12 left-1/2 w-10 text-white bg-gray-900 -translate-x-1/2 aspect-square flex items-center justify-center rounded-full'
                  onClick={scrollToBottom}
                  aria-label="Scroll to bottom"
                >
                  <FaArrowDownLong size={15} />
                </button>
              )}
              <div className="flex w-full items-center justify-center pb-4">
                <ChatForm data={prompt} onSubmit={onSubmit} setData={setPrompt} />
              </div>
            </div>
          </div>
        )}
        <div className='min-w-[40%] max-w-[70%]'>
          <CodeEditor code={code} setCode={setCode} />
        </div>
      </Split>
  );
}

function Default() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-gray-500 text-lg mb-6">Select a chat to start messaging</p>
      <ChatForm />
    </div>
  );
}

export default Playground;
