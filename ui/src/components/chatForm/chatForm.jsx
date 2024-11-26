import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import PropTypes from 'prop-types';

function ChatForm({ data, setData, onSubmit }) {

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center gap-3 px-6 py-4 w-[70%] border border-gray-300 rounded-full bg-white relative">
        <input
          type="text"
          placeholder="Enter a prompt here"
          value={data}
          id="prompt"
          onChange={(e) => setData(e.target.value)}
          className="flex-1 border-none focus:outline-none text-sm"
          aria-label="Chat prompt input"
        />
        <button onClick={onSubmit} aria-label="Send prompt">
          <AiOutlineSend className="text-gray-500 hover:text-gray-700" size={20} />
        </button>
      </div>
      <footer className="text-xs text-gray-500">
        Powered by{' '}
        <a
          href="https://gemini.google.com/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-500 hover:text-indigo-600"
        >
          GeminiAI
        </a>
      </footer>
    </div>
  );
}

ChatForm.propTypes = {
  data: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
