import React from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import './chatForm.css'

function ChatForm(props) {
    const {data,setData,onSubmit} = props
  return (
    <div className="input-prompt">
        <input
          type="text"
          placeholder="Enter a prompt here"
          value={data}
          id="prompt"
          onChange={(e) => setData(e.target.value)}
        />
        <div className="send-icon">
          <AiOutlineSend onClick={onSubmit} />
        </div>
        <div className="footer">
          <div className="footer-text">
            Powered by{" "}
            <a
              href="https://gemini.google.com/"
              target="_blank"
              rel="noreferrer"
            >
              GeminiAI
            </a>
          </div>
        </div>
      </div>
  )
}

export default ChatForm
