
import './App.css';
import './normalize.css';
import { useState, useEffect } from 'react';



function App() {

 

    //add state for input and chat log

    const [input, setInput] = useState('');
    const [models, setModels] = useState([]);
    const [currentModel, setCurrentModel] = ("ada");
    const [chatLog, setChatLog] = useState([{
      user: "gpt",
      message: "how can i help you"
    },{
      user: "you",
      message: "you are a developer"
    }]);

    useEffect(() => {
      getEngines();
      
    }, [])

    // clear chat

    function clearChat() {
      setChatLog([]);
      
    }
    

    const getEngines = async () => {
      try {
        const response = await fetch("http://localhost:5000/models");
        const data = await response.json();
        setModels(data.models);
      } catch (err) {
        console.error(err);
      }
    };

 async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, {user: 'me', message: `${input}`}]
     setInput('');
     setChatLog(chatLogNew);
    //fetch request to the api combining the chat log array of messages and sending it as message to localhost as post
    const messages = chatLogNew.map((message) => message.message)
    .join("\n")
  
    const response = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: messages,
      currentModel,
     })
   });
  const data = await response.json();
  setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}`}]);
  console.log(data.message);


    
  }
  

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className='side-menu-button' onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        <div className="models">

          <select onChange={(e) => {
            setCurrentModel(e.target.value);
          }}>
            {models.map((model, index) => (
              <option key={model.id} value={model.id}>{model.id}</option>
            ))}
          </select>
          
        </div>
      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

        </div>
          <div className='chat-input-holder'>
            <form action="" onSubmit={handleSubmit}>
            <input value={input} onChange={(e) => setInput(e.target.value)} className="chat-input-input" rows="1" placeholder='Ask Bot...'></input>
            </form>
          </div>
      </section>

      
    </div>
  )
}

  const ChatMessage = ({ message }) => {
    return (
      <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
          <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
            {message.user === "gpt" &&         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 29.53">
    <path d="M40.7 6.98h-.14c-4.67 0-7.58 2.91-7.58 7.6v2.53c0 4.69 2.9 7.6 7.58 7.6h.14c4.67 0 7.58-2.91 7.58-7.6v-2.53c0-4.69-2.91-7.6-7.58-7.6Zm4.31 10.31c0 3.08-1.6 4.86-4.38 4.89-2.78-.03-4.38-1.81-4.38-4.89v-2.88c0-3.08 1.6-4.86 4.38-4.89 2.78.03 4.38 1.81 4.38 4.89v2.88Zm40.57-5.79h-.14c-1.77 0-3.03.6-3.65 1.75l-.19.35v-1.8h-3.02v12.56h3.17v-7.48c0-1.76.95-2.77 2.59-2.8 1.57.03 2.47 1.02 2.47 2.73v7.55h3.17v-8.09c0-2.99-1.64-4.77-4.39-4.77ZM120 9.73v-2.4h-10.46v2.4h3.67v12.22h-3.67v2.4H120v-2.4h-3.67V9.73H120Zm-18.75-2.4h-3.28l-6.1 17.04h3.43l1.17-3.65h6.66v.04l1.17 3.62h3.43l-6.11-17.04h-.36Zm-4.03 10.98 2.57-8.05 2.55 8.05h-5.12ZM57.77 11.5h-.14c-1.59 0-2.96.66-3.68 1.76l-.18.28V11.8h-3.02v16.89h3.17v-5.9l.18.27c.68 1.01 2.01 1.61 3.56 1.61H57.81c2.61 0 5.24-1.7 5.24-5.51v-2.14c0-2.74-1.62-5.51-5.26-5.51Zm2.1 7.5c0 2-1.15 3.24-3.01 3.28-1.73-.03-2.94-1.35-2.94-3.23v-1.89c0-1.9 1.22-3.24 2.97-3.28 1.84.03 2.98 1.28 2.98 3.28V19Zm11.05-7.5c-.06 0-.12.01-.18.01s-.12-.01-.18-.01c-3.57 0-5.78 2.23-5.78 5.81v1.76c0 3.45 2.24 5.59 5.83 5.59.08 0 .15 0 .22-.01.05 0 .09.01.14.01 2.41 0 4.09-.88 5.16-2.7L74 20.73c-.71 1.05-1.66 1.84-3.02 1.84-1.82 0-2.91-1.12-2.91-3.01v-.5h8.44v-2.08c0-3.34-2.19-5.49-5.59-5.49Zm-2.86 5.54v-.3c0-2 .95-3.12 2.68-3.2 1.66.08 2.66 1.18 2.66 2.99v.5h-5.34ZM27.21 12.08c.67-2.01.44-4.21-.63-6.04a7.458 7.458 0 0 0-8.01-3.57A7.39 7.39 0 0 0 13.02 0a7.47 7.47 0 0 0-7.1 5.15A7.381 7.381 0 0 0 1 8.72a7.44 7.44 0 0 0 .92 8.72c-.67 2.01-.44 4.21.63 6.03a7.457 7.457 0 0 0 8.02 3.58 7.363 7.363 0 0 0 5.54 2.48c3.23 0 6.1-2.08 7.1-5.15a7.34 7.34 0 0 0 4.91-3.57 7.422 7.422 0 0 0-.91-8.72Zm-2.3-5.07c.64 1.12.88 2.43.66 3.7-.04-.03-.12-.07-.17-.1l-5.88-3.4a.986.986 0 0 0-.97 0l-6.89 3.98V8.27l5.69-3.29a5.531 5.531 0 0 1 7.56 2.03Zm-13.25 6.07 2.9-1.68 2.9 1.68v3.35l-2.9 1.68-2.9-1.68v-3.35Zm1.35-11.15c1.3 0 2.55.45 3.55 1.28-.04.02-.12.07-.18.1L10.5 6.7c-.3.17-.48.49-.48.84v7.96l-2.53-1.46V7.46c0-3.06 2.47-5.53 5.53-5.54ZM2.68 9.69a5.546 5.546 0 0 1 2.88-2.43v6.99c0 .35.18.66.48.84l6.88 3.97-2.54 1.47-5.68-3.28a5.537 5.537 0 0 1-2.02-7.56Zm1.55 12.83a5.489 5.489 0 0 1-.66-3.7c.04.03.12.07.17.1l5.88 3.4c.3.17.67.17.97 0l6.88-3.98v2.92l-5.69 3.28c-2.65 1.52-6.03.62-7.56-2.02Zm11.89 5.08c-1.29 0-2.55-.45-3.54-1.28.04-.02.13-.07.18-.1l5.88-3.39c.3-.17.49-.49.48-.84v-7.95l2.53 1.46v6.57c0 3.06-2.48 5.54-5.53 5.54Zm10.34-7.76a5.52 5.52 0 0 1-2.88 2.42v-6.99c0-.35-.18-.67-.48-.84l-6.89-3.98 2.53-1.46 5.69 3.28a5.528 5.528 0 0 1 2.02 7.56Z" />
  </svg>}
          </div>
          <div className="message">
              {message.message}
          </div>
      </div>
    </div>
    )
  }



export default App

