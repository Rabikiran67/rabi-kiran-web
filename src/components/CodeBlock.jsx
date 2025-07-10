// src/components/CodeBlock.jsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-background rounded-lg shadow-2xl shadow-primary/20 border border-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:border-primary/40 hover:scale-105 hover:-translate-y-1">
      {/* Window Header */}
      <div className="p-3 bg-dark-container flex items-center gap-2 rounded-t-lg">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      {/* Code Area */}
      <div className="p-4 font-mono text-left">
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{
            background: 'transparent',
            margin: 0,
            padding: 0,
            fontSize: '1rem',
            lineHeight: '1.5rem',
          }}
          wrapLines={true}
          showLineNumbers={false}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock; 