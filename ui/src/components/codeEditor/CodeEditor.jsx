import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, setCode }) {
    const tabs = ['html', 'css', 'javascript', 'preview'];
    const [activeTab, setActiveTab] = useState(0);
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setSrcDoc(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                    <style>
                        * {
                            padding: 0;
                            margin: 0;
                            box-sizing: border-box;
                        }
                    </style>
                    <style>${code.css}</style>
                </head>
                <body>
                    ${code.html}
                </body>
                <script>${code.js}</script>
                </html>
            `);
        }, 250);
    }, [code]);

    const renderEditor = (language, value, onChange) => (
        <Editor
            height="100%"
            width="100%"
            language={language}
            value={value || ''}
            theme="light"
            onChange={onChange}
        />
    );

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Top Navbar */}
            <div className="flex items-center justify-between bg-[#1e1e1e] text-white px-4 py-2 shadow-lg">
                <div className="text-sm font-semibold text-gray-300">Code Editor</div>
                <div className="flex space-x-4">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(index)}
                            className={`text-sm px-3 py-1 rounded ${activeTab === index ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 bg-gray-100 relative">
                {activeTab === 0 && renderEditor('html', code.html, (value) => setCode(prev => ({ ...prev, html: value || '' })))}
                {activeTab === 1 && renderEditor('css', code.css, (value) => setCode(prev => ({ ...prev, css: value || '' })))}
                {activeTab === 2 && renderEditor('javascript', code.js, (value) => setCode(prev => ({ ...prev, js: value || '' })))}
                {activeTab === 3 && (
                    <div className="h-full w-full bg-white">
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            className="w-full h-full border-none"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

CodeEditor.propTypes = {
    code: PropTypes.shape({
        html: PropTypes.string,
        css: PropTypes.string,
        js: PropTypes.string,
    }).isRequired,
    setCode: PropTypes.func.isRequired,
};

export default CodeEditor;
