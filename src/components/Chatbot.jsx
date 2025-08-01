import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";



export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(""); // State variable for the input message
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 

  const handleSendMessage = async (message) => {
    setIsLoggedIn(true);
    if (!message.trim()) return; // Prevent sending empty messages

    // Add the user message to the messages array
    setMessages(prevMessages => [
      ...prevMessages, 
      { text: message, type: 'user' }
    ]);

    setMessage(""); // Clear the input field

    try {
      const sessionId = "12345"; // Replace with your session ID
      const response = await fetch(`https://sih-backend-2t3a.onrender.com/chat/generate?prompt=${encodeURIComponent(message)}`);
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
          // Find the index of the AI message that is currently streaming
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
            ? { ...msg, isStreaming: false } // Remove `isStreaming` flag
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

  const [samplePrompts, setSamplePrompts] = useState([
    { description: 'What is the minimum prison sentence for drink and drive case ?' },
    { description: 'What are non bailable offences ?' },
    { description: 'What are the general principles of IPC ?' },
  ]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-indigo-100">
     
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
       

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-8 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-auto">
            {!isLoggedIn ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col justify-center">
                <div className="text-center space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">EquiLaw Smart Legal Assistant</h1>
                    <p className="text-gray-600 text-lg">"Welcome to your legal assistant! How can I assist you with your case or legal query today?"</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {samplePrompts.map((ele, index) => (
                      <div 
                        key={index}
                        onClick={() => {setMessage(ele.description)}} 
                        className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <h3 className="font-semibold text-center leading-relaxed">{ele.description}</h3>
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
                       <p className="leading-relaxed">{msg.text}</p>

                      </div>

                      {msg.type === 'user' && (
                        <Avatar className="w-10 h-10 border-2 border-blue-200">
                          <AvatarFallback className="bg-gray-700 text-white font-semibold">JD</AvatarFallback>
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