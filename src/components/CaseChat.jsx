'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

function Loader() {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
    </div>
  );
}

export default function CaseChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [caseTitle, setCaseTitle] = useState("Example Case Title");
  const [caseDescription, setCaseDescription] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const caseid = location.state.caseid;
  const title = location.state.caseTitle;
  const _id = location.state._id;

  const [samplePrompts, setSamplePrompts] = useState([
    { title: 'Get More Details', description: 'tell me more about this case' },
    { title: 'Summarize', description: 'Please summarize this case analysis' },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(0);

  const handleSamplePromptClick = (description) => {
    setMessage(description);
    setIsLoggedIn(1);
  };

  useEffect(() => {
    const getCaseDetails = async () => {
      try {
        const response = await axios.get(`https://sih-backend-2t3a.onrender.com/case_analysis/analyze/${_id}`);
        console.log(response.data);
        setCaseDescription(response.data); // Set markdown directly
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };
    getCaseDetails();
  }, [caseid]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return; // Prevent sending empty messages

    // Add the user message to the messages array
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, type: 'user' }
    ]);

    setMessage(""); // Clear the input field

    try {
      const response = await fetch(`https://sih-backend-2t3a.onrender.com/case_analysis/generate?prompt=${encodeURIComponent(message)}`);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let currentMessage = '';

      // Add the AI message to the messages array initially
      setMessages(prevMessages => [
        ...prevMessages,
        { text: '', type: 'ai', isStreaming: true } // Added `isStreaming` to indicate partial message
      ]);

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode the chunk and append to currentMessage
        currentMessage += decoder.decode(value, { stream: true });

        // Update the AI message in the messages array
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(msg =>
            msg.type === 'ai' && msg.isStreaming
              ? { ...msg, text: currentMessage }
              : msg
          );
          return updatedMessages;
        });
      }

      // Finalize the AI message after stream ends
      setMessages(prevMessages => {
        return prevMessages.map(msg =>
          msg.type === 'ai' && msg.isStreaming
            ? { ...msg, isStreaming: false, text: currentMessage } // Set final message text
            : msg
        );
      });
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter key is pressed without Shift
      e.preventDefault(); // Prevent the default newline behavior
      handleSendMessage(message);
    }
  };

  return (
    <div className="flex h-screen from-gray-50 to-indigo-100 bg-gradient-to-br">
      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        {/* Case Description at the top */}
        <div className="h-2/5 p-8 pb-4">
          <Card className="h-full overflow-auto shadow-lg rounded-2xl">
            <CardHeader className="bg-gray-800 text-white rounded-t-2xl">
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6">
              <ScrollArea className="h-full pr-4">
                <ReactMarkdown className="text-gray-800 leading-relaxed">{caseDescription}</ReactMarkdown>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-8 pt-4 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-auto">
            {isLoggedIn === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center">
                <div className="text-center space-y-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Ask about this case</h1>
                    <p className="text-gray-600 text-lg">How can I help you understand this case better?</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-12">
                    {samplePrompts.map((ele, index) => (
                      <div 
                        key={index}
                        onClick={() => handleSamplePromptClick(ele.description)} 
                        className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <h3 className="font-semibold text-lg mb-2">{ele.title}</h3>
                        <p className="text-blue-100 leading-relaxed">{ele.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg flex-1 p-6 overflow-auto">
                <div className="space-y-6">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 ${msg.type === 'user' ? "justify-end" : ""}`}
                    >
                      {msg.type === 'ai' && (
                        <Avatar className="w-10 h-10 border-2 border-blue-200">
                          <AvatarImage src="/placeholder-user.jpg" alt="AI Avatar" />
                          <AvatarFallback className="bg-blue-600 text-white font-semibold">AI</AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={`rounded-2xl p-4 max-w-[70%] shadow-sm ${
                          msg.type === 'ai' 
                            ? "bg-gray-50 text-gray-800 border border-gray-200" 
                            : "bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto"
                        }`}
                      >
                        {msg.type === 'ai' ? (
                          msg.isStreaming ? <Loader /> : <ReactMarkdown className="leading-relaxed">{msg.text}</ReactMarkdown>
                        ) : (
                          <p className="leading-relaxed">{msg.text}</p>
                        )}
                      </div>

                      {msg.type === 'user' && (
                        <Avatar className="w-10 h-10 border-2 border-blue-200">
                          <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                          <AvatarFallback className="bg-gray-700 text-white font-semibold">AC</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4">
            <Textarea
              placeholder="Type your message..."
              className="flex-1 resize-none border-0 bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <Button 
              size="icon" 
              onClick={() => handleSendMessage(message)}
              className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl w-12 h-12 shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              <SendIcon className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}