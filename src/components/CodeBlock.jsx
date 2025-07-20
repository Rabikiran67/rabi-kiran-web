// src/components/CodeBlock.jsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-lg shadow-2xl shadow-primary/20 border border-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:border-primary/40 hover:scale-105 hover:-translate-y-1 overflow-hidden">
      {/* Conic Gradient Background */}
      <div 
        className="absolute inset-0 animate-spin-slow"
        style={{
          background: `conic-gradient(from 0deg, #8B5CF6, #EC4899, #8B5CF6, #EC4899, #8B5CF6)`,
          opacity: 0.1
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 bg-dark-background rounded-lg m-1">
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
    </div>
  );
};

export default CodeBlock; 