
import React, { useEffect } from 'react';


function ChatbotComponent() {
  useEffect(() => {
    // JavaScript code to set up the chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "nsz4MWpAcE96X76wbSotu",
      domain: "www.chatbase.co"
    };

    // Dynamically create and append the chatbot script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.chatbotId = "nsz4MWpAcE96X76wbSotu";
    script.domain = "www.chatbase.co";
    script.defer = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Your component's content */}
    </div>
  );
}

export default ChatbotComponent;
