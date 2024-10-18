import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import ChatForm from "../chatForm/chatForm";
import "./chat.css";

function Chat() {
  const { chatId } = useParams();
  const location = useLocation();
  const [prompt, setPrompt] = useState(location.state?.prompt || "");
  const [messages, setMessages] = useState([]);

  const postPrompt = async () => {
    const res = await axios.post(`http://localhost:8080/chats/${chatId}/messages`, {
      text: prompt,
    });
    const data = await res.data;
    console.log(data);
    setMessages((prev) => [...prev, data]);
    setPrompt("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/chats/${chatId}`);
      const data = await res.data;
      console.log(data);
      setMessages(data.messages);
    };
    fetchData();
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <>
      <div className="chat-container">
     
        {prompt ? (
          <div className="chat-message user">
            <div className="chat-message-text">AI: {prompt}</div>
          </div>
        ) :  <h1>Welcome to the chatbot playground</h1>}
        {messages.map((message) => (
          <div className="chat-message" key={message.id}>
            {/* <div className="chat-message">
              <div className="chat-message-text">
                <SyntaxHighlighter language="html" style={a11yDark}>
                  {message.ht}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="chat-message">
              <div className="chat-message-text">
                <SyntaxHighlighter language="css" style={a11yDark}>
                  {AIRespoinse.css}
                </SyntaxHighlighter>
              </div>
            </div>

            <div className="chat-message">
              <div className="chat-message-text">
                <SyntaxHighlighter language="javascript" style={a11yDark}>
                  {AIRespoinse.js}
                </SyntaxHighlighter>
              </div>
            </div> */}
            {JSON.stringify(message)}
          </div>

        ))}
      </div>
      <ChatForm data={prompt} setData={setPrompt} onSubmit={postPrompt} />
    </>
  );
}

export default Chat;
