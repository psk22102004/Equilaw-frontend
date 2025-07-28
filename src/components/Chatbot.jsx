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
    <div className=" mt-16 md:mt-0 flex flex-col w-full bg-gray-100 h-screen overflow-hidden">
      <div className="flex-1 flex flex-col lg:pb-16 p-3 md:p-6 lg:pt-16 overflow-auto"> {/* Adjust padding-top */}
        {/* Scrollable container */}
        <div className="flex-1  scrollableContainer">
          {!isLoggedIn ? <div className="bg-white text-center space-y-10 w-full h-full flex flex-col items-center p-10 rounded-xl shadow-xl ">
            <h1 className="font-montserrat font-semibold text-3xl">EquiLaw Smart Legal Assistant</h1>
            <p className="font-montserrat">"Welcome to your legal assistant! How can I assist you with your case or legal query today?"</p>
            <div className="hidden md:flex justify-evenly w-full">
              {
                samplePrompts.map(
                  (ele) => {
                    return (
                      <div onClick={()=>{setMessage(ele.description)}} className="bg-blue-800 font-semibold border w-72 p-6 text-center text-pretty rounded-xl shadow-lg hover:shadow-xl text-white">
                        <h1 className="">{ele.description} </h1>
                      </div>
                    )
                  }

                )
              }
            </div>
          </div> : null
          }

          <div className="grid  gap-4">
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
                  className={`${msg.type === 'ai' ? "bg-blue-200 font-semibold" : "bg-blue-700  font-semibold"
                    } rounded-lg p-4 max-w-[70%] ${msg.type === 'ai' ? "text-black" : "text-white"
                    }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background border px-6 py-4 flex items-center gap-4  bottom-0 w-full right-0"> {/* Fixed to bottom */}
        <Textarea
          placeholder="Type your message..."
          className="flex-1 resize-none rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
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
