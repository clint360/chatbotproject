import { useState } from 'react';
import axios from 'axios';
import CGLogo from './chatGPT.png';
import AppLogo from './app-logo.png';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  class Message {
    constructor(content, src, time) {
      this.content = content;
      this.src = src;
      this.time = time;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const m = new Message(prompt, 'user', '12:14');
    setMessages((prev) => [...prev, m]);
    // communicate with API
    // post input value 'prompt' to API end point 
    axios
      .post("http://localhost:5555/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        const a = new Message(res.data, 'user', '12:14');
        setMessages((prev) => [...prev, a]);
        setLoading(false);
      })
      .catch((err) => {
      });

  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>My AI</div>
      <div className="wrapper">
        <div className='texts'>
          {messages && messages.map((message, index) => {
              return (
                <div className={`message ${ message.src === 'user' ?`my_message` : `ai_message`}`}>
                  <p>{message.content}
                    <span>{message.time}</span>
                  </p>
                </div>
              )
          })}

        </div>
        <div className="ask-area">
          <p className="response-area">
            {loading ? 'loading...' : response}
          </p>
          <form onSubmit={handleSubmit}>
            <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything... :)"
            />
            <button type="submit">Ask</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;