import React, { useState, useEffect, useRef } from "react";
import './FloatingSidebarChat.css';

export default function FloatingSidebarChat() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [currentAssistant, setCurrentAssistant] = useState("assistant_1");
  const [assistantsState, setAssistantsState] = useState({});
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const API_BASE_URL = "/asistente";

  useEffect(() => {
    fetchAssistants();
  }, []);

  useEffect(() => {
    if (currentAssistant) {
      const savedMessages = loadChatFromLocalStorage(currentAssistant);
      setAssistantsState((prevState) => ({
        ...prevState,
        [currentAssistant]: {
          ...prevState[currentAssistant],
          messages: savedMessages,
        },
      }));
    }
  }, [currentAssistant]);

  useEffect(() => {
    if (currentAssistant) {
      saveChatToLocalStorage(
        currentAssistant,
        assistantsState[currentAssistant]?.messages || []
      );
    }
  }, [assistantsState, currentAssistant]);

  const fetchAssistants = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/assistants`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();

      const initialAssistantsState = {};
      const initialButtons = data.assistants.map((assistant, index) => {
        initialAssistantsState[assistant.key] = { threadId: null, messages: [] };
        return { id: index + 1, label: assistant.name, assistant: assistant.key };
      });

      setAssistantsState(initialAssistantsState);
      setButtons(initialButtons);
      if (initialButtons.length > 0) setCurrentAssistant(initialButtons[0].assistant);
    } catch (error) {
      console.error("Error al cargar los asistentes:", error);
    }
  };

  const saveChatToLocalStorage = (assistantKey, messages) => {
    localStorage.setItem(`chat_${assistantKey}`, JSON.stringify(messages));
  };

  const loadChatFromLocalStorage = (assistantKey) => {
    const savedMessages = localStorage.getItem(`chat_${assistantKey}`);
    return savedMessages ? JSON.parse(savedMessages) : [];
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const selectAssistant = (assistant) => {
    setCurrentAssistant(assistant);
    adjustChatPosition();
  };

  const adjustChatPosition = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    if (!currentAssistant || !assistantsState[currentAssistant]) {
      console.error("Asistente actual no definido o estado no configurado");
      return;
    }

    const assistantState = { ...assistantsState };
    assistantState[currentAssistant].messages.push({
      sender: "user",
      content: userMessage,
    });
    setAssistantsState(assistantState);

    setUserMessage("");
    setLoading(true);

    fetch(`${API_BASE_URL}/chat/${currentAssistant}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: userMessage,
        thread_id: assistantState[currentAssistant].threadId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        assistantState[currentAssistant].messages.push({
          sender: "bot",
          content: data.response || "Error",
        });
        assistantState[currentAssistant].threadId =
          data.thread_id || assistantState[currentAssistant].threadId;
        setAssistantsState(assistantState);
        setLoading(false);
        adjustChatPosition();
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        assistantState[currentAssistant].messages.push({
          sender: "bot",
          content: "Error al enviar el mensaje.",
        });
        setAssistantsState(assistantState);
        setLoading(false);
      });
  };

  return (
    <div id="app-container">
      <div id="main-content" ref={chatContainerRef}>
        {assistantsState[currentAssistant]?.messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "bot" ? "bot-message" : "user-message"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {loading && <div className="loading-spinner">Cargando...</div>}
      </div>
      <div id="chat-footer">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="input-text"
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} className="send-button">
          &gt;
        </button>
      </div>
    </div>
  );
}
