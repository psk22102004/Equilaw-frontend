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
    <div className="flex flex-col mt-16 md:mt-0 bg-backg h-screen overflow-hidden md:w-full">
      {/* Case Description at the top */}
      <div className="h-2/5 p-2 ">
        <Card className="h-full overflow-auto ">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="pr-4">
              <ReactMarkdown>{caseDescription}</ReactMarkdown> {/* Render markdown */}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Chat area */}
      <div className="flex flex-col h-3/5 flex-1">
        <div className="flex-1 p-6 overflow-auto">
          <div className={isLoggedIn === 1 ? `h-full w-full hidden justify-center items-end gap-4 ` : `h-full w-full flex  justify-center items-end gap-4`}>
            {samplePrompts.map((ele, index) => (
              <div
                onClick={() => handleSamplePromptClick(ele.description)}
                key={index}
                className={isLoggedIn === 1 ? `p-6 flex flex-col space-y-6 border rounded-xl  bg-blue-800 text-white font-semibold shadow-lg ` : ` p-3 md:p-6 flex flex-col space-y-2 md:space-y-6 border rounded-xl  bg-blue-800 text-white font-semibold shadow-lg`}
              >
                <h1 className='text-lg md:text-xl'>{ele.title}</h1>
                <h1 className='text-white'>{ele.description}</h1>
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="grid gap-4 overflow-y-auto h-full">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${msg.type === 'user' ? "justify-end" : ""}`}
                >
                  {msg.type === 'ai' ? (
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="AI Avatar" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`${msg.type === 'ai' ? "bg-blue-200 font-semibold" : "bg-blue-700 font-semibold"} rounded-lg p-4 max-w-[70%] ${msg.type === 'ai' ? "text-black" : "text-white"}`}
                  >
                    {msg.type === 'ai' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown> // Render markdown for AI messages
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t px-6 py-4 flex items-center gap-4 bg-white">
          <Textarea
            placeholder="Type your message..."
            className="resize-none rounded-lg border border-input px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            value={message} // Ensure the value is controlled by the state
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // Handle key down event
          />
          <Button size="icon" onClick={() => handleSendMessage(message)}>
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
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
