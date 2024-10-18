import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import './codeEditor.css'

function CodeEditor() {
    const [activePage, setActivePage] = useState('html');
    const [html, setHtml] = useState("<div class=\"batting-animation\">\n  <div class=\"bat\"></div>\n  <div class=\"ball\"></div>\n</div>");
    const [css, setCss] = useState(".batting-animation {\n  position: relative;\n  width: 400px;\n  height: 200px;\n  margin: 50px auto;\n  border: 2px solid black;\n  overflow: hidden;\n}\n\n.bat {\n  position: absolute;\n  bottom: 10px;\n  left: 50px;\n  width: 100px;\n  height: 20px;\n  background-color: brown;\n  transform-origin: 100% 50%;\n  animation: swing 1s ease-in-out forwards;\n}\n\n.ball {\n  position: absolute;\n  top: 50%;\n  left: 350px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: white;\n  transform: translateY(-50%);\n  animation: fly 1s ease-in-out forwards;\n}\n\n@keyframes swing {\n  0% {\n    transform: rotate(0deg);\n  }\n  50% {\n    transform: rotate(-45deg);\n  }\n  100% {\n    transform: rotate(-90deg);\n  }\n}\n\n@keyframes fly {\n  0% {\n    left: 350px;\n  }\n  100% {\n    left: -50px;\n  }\n}");
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                  <body>${html}</body>
                  <style>${css}</style>
                  <script>${js}</script>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);
    return (
        <div className='codeeditor'>
            <div className="codeeditor-navbar">
                <button onClick={() => setActivePage('html')}>HTML</button>
                <button onClick={() => setActivePage('css')}>CSS</button>
                <button onClick={() => setActivePage('javascript')}>JavaScript</button>
                <button onClick={() => setActivePage('preview')}>Preview</button>
            </div>
            <div className="codeeditor-content">
                {activePage === 'html' && (
                    <Editor
                        height="100%"
                        width="100%"
                        language="html"
                        displayName="HTML"
                        value={html}
                        theme="vs-dark"
                        onChange={setHtml}
                    />
                )}
                {activePage === 'css' && (
                    <Editor
                        height="500px"
                        width="100%"
                        language="css"
                        displayName="CSS"
                        value={css}
                        theme="vs-dark"
                        onChange={setCss}
                    />
                )}
                {activePage === 'javascript' && (
                    <Editor
                        height="500px"
                        width="100%"
                        language="javascript"
                        displayName="JavaScript"
                        value={js}
                        theme="vs-dark"
                        onChange={setJs}
                    />
                )}
                {activePage === 'preview' && (
                    <div>
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            width="100%"
                            height="100%"
                            className="full-screenable-node"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CodeEditor;