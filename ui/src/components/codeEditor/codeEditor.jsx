import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from '@monaco-editor/react';


function CodeEditor({ code, setCode }) {
    const tabs = ['html', 'css', 'javascript', 'preview'];
    const [activePage, setActivePage] = useState('html');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState(0);

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
    }, [code])

    return (
        <div className="flex flex-col h-screen w-full bg-gray-50">
            {/* Top Navbar */}
            <div className="flex items-center justify-between bg-[#1e1e1e] text-white px-4 py-2 shadow-lg">
                <div className="text-sm font-semibold text-gray-300">Code Editor</div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setActivePage('html')}
                        className={`text-sm px-3 py-1 rounded ${activePage === 'html' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                            }`}
                    >
                        HTML
                    </button>
                    <button
                        onClick={() => setActivePage('css')}
                        className={`text-sm px-3 py-1 rounded ${activePage === 'css' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                            }`}
                    >
                        CSS
                    </button>
                    <button
                        onClick={() => setActivePage('javascript')}
                        className={`text-sm px-3 py-1 rounded ${activePage === 'javascript' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                            }`}
                    >
                        JavaScript
                    </button>
                    <button
                        onClick={() => setActivePage('preview')}
                        className={`text-sm px-3 py-1 rounded ${activePage === 'preview' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'
                            }`}
                    >
                        Preview
                    </button>
                </div>
            </div>
            {/* Content Area */}
            <div className="flex-1 bg-gray-100 relative">
                {activePage === 'html' && (
                    <Editor
                        height="100%"
                        width="100%"
                        language="html"
                        value={code.html || ''}
                        theme="vs-dark"
                        onChange={(value) => setCode(prev => ({ ...prev, html: value || '' }))}
                    />
                )}
                {activePage === 'css' && (
                    <Editor
                        height="100%"
                        width="100%"
                        language="css"
                        value={code.css || ''}
                        theme="vs-dark"
                        onChange={(value) => setCode(prev => ({ ...prev, css: value || '' }))}
                    />
                )}
                {activePage === 'javascript' && (
                    <Editor
                        height="100%"
                        width="100%"
                        language="javascript"
                        value={code.js || ''}
                        theme="vs-dark"
                        onChange={(value) => setCode(prev => ({ ...prev, js: value || '' }))}
                    />
                )}
                {activePage === 'preview' && (
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
