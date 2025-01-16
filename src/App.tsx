/**
 * 
 * @file App.tsx
 *
 * @description This component manages an interactive chat interface between the user and a bot, using 
 * the OpenAI API. Provides a clean visual design with a stylized header, message display area 
 * exchanged and a section to send new messages. Includes logic to handle user input, 
 * make requests to the API and display received messages. Also manages loading and error statuses 
 * to improve user experience.
 *
 * @author Natalia Díaz Castro
 * @date 2025-01-16
 */

import { useState } from "react";
import "./App.css";
import { fetchOpenAIResponse } from "./api/openai";

interface TypeMessage {
  text: string;
  sender: "user" | "bot";
}

function App() {
  const [messageUser, setMessage] = useState("");
  const [messages, setMessages] = useState<TypeMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  /**
   * Manages the sending of user messages in the chat and updates the status of the messages, storing the user's messages.
   * @function sendMessage
   * @description Validates the user's message, adds it to the message list and calls
   * the function responsible for sending the user's message to the API.
   * @returns {void}
   */
  const sendMessage = () => {
    if (messageUser.trim()) {
      setMessages((prevMessage) => [
        ...prevMessage,
        {
          text: messageUser,
          sender: "user",
        },
      ]);
      responseBot();
      setMessage("");
    }
  };

  /**
   * Detects the pressing of the enter key.
   * @function handleKeyPress
   * @param {Object} e - Keyboard event.
   * @param {string} e.key - Name of the key pressed.
   * @description if the key pressed inside the input is 'Enter', it calls the function responsible for handling messages
   * @returns {void}
   */
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  /**
   * Gets the response generated with the OpenAI API according to the message sent by the user
   * @function responseBot
   * @async
   * @description Sends the user's message to the API, processes the response, and updates the message status.
   * It also handles loading status and possible errors.
   * @returns {Promise<void>}
   */
  const responseBot = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchOpenAIResponse(messageUser);
      setMessages((prevMessage) => [
        ...prevMessage,
        {
          text:
            res?.choices[0]?.message?.content,
          sender: "bot",
        },
      ]);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al procesar la solicitud."
      );
    } finally {
      setLoading(false);
    }
  };

  /** CSS Styles */

  const colorBackground =
    "linear-gradient(90deg, rgba(2,55,124,1) 16%, rgba(30,88,164,1) 80%, rgba(61,127,210,1) 100%)";

  const headerChat: React.CSSProperties = {
    background: colorBackground,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "80px",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: 8,
    boxSizing: "border-box",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  };

  const contentChat: React.CSSProperties = {
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    padding: 15,
    overflow: "auto",
    boxSizing: "border-box",
    marginBottom: '65px',
    height: "calc(100% - 145px)",
  };

  const divContentMessage: React.CSSProperties = {
    boxSizing: "border-box",
    maxWidth: "70%",
    padding: "10px",
    borderRadius: 15,
    textAlign: "start",
    fontSize: 12,
  };

  const divSendMessage: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "#e3e8ee",
    width: "100%",
    left: 0,
    bottom: 0,
    height: '65px',
    padding: "15px 20px 15px 20px",
    boxSizing: "border-box",
    borderEndEndRadius: 15,
    borderEndStartRadius: 15,
  };

  const inputStyle: React.CSSProperties = {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    backgroundColor: "#bcc0c5",
    outline: "none",
    width: "100%",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "14px",
    boxSizing: "border-box",
    color: "#000",
    paddingRight: 60,
  };

  const buttonSend: React.CSSProperties = {
    background: colorBackground,
    display: "flex",
    position: "absolute",
    right: 0,
    top: -7,
    width: "50px",
    height: "50px",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <>
      <div
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        <section className="chat-box">
          {/* header chat */}
          <div style={headerChat}>
            <div>
              <img
                src="https://cdn.pixabay.com/photo/2024/05/22/01/46/room-8779510_1280.png"
                alt="AI"
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                }}
              >
                Habla con
              </div>
              <div
                style={{
                  fontSize: 20,
                }}
              >
                IA
              </div>
            </div>
          </div>
          {/* Content Message */}
          <div className="scrollable" style={contentChat}>
            {/* Messages user and bot */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "auto",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      ...divContentMessage,
                      background:
                        msg.sender === "user" ? colorBackground : "#E9E9EC",
                      color: msg.sender === "user" ? "#fff" : "#11131E",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>

          {/* Send Message */}
          <div style={divSendMessage}>
            <form
              style={{
                position: "relative",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Ingrese su mensaje..."
                value={messageUser}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                style={inputStyle}
              />

              <div style={buttonSend} onClick={sendMessage}>
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none"></rect>
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path
                        fill="#FFF"
                        d="M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
