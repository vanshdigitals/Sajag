'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Trash2, Sparkles, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getGeminiModel } from '@/lib/gemini';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your Sajag Assistant. Ask me anything about the Indian election process, Voter IDs, or what happens on polling day." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = getGeminiModel();
      const prompt = `You are a helpful election assistant for Indian citizens. Answer the following question clearly and simply: ${userMessage}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting to the brain. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  const suggestedQuestions = [
    "How to check voter status?",
    "Documents for voting?",
    "What is VVPAT?",
    "Voting for NRIs?"
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Sparkles className={styles.aiIcon} size={24} />
          <div>
            <h1>Sajag Assistant</h1>
            <p>AI-Powered Election Help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat">
          <Trash2 size={20} />
        </Button>
      </header>

      <div className={styles.chatArea}>
        {messages.map((msg, i) => (
          <motion.div 
            key={i} 
            className={`${styles.messageWrapper} ${styles[msg.role]}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.avatar}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={styles.messageBubble}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.assistant}`}>
            <div className={styles.avatar}><Bot size={16} /></div>
            <div className={styles.messageBubble}>
              <div className={styles.typing}><span></span><span></span><span></span></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <footer className={styles.chatFooter}>
        <div className={styles.suggestions}>
          {suggestedQuestions.map((q, i) => (
            <button key={i} onClick={() => setInput(q)} className={styles.suggestionBtn}>
              {q}
            </button>
          ))}
        </div>
        <div className={styles.inputArea}>
          <input 
            type="text" 
            placeholder="Ask a question..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isLoading} className={styles.sendBtn}>
            <Send size={20} />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AssistantPage;
