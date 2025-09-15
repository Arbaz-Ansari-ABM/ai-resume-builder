// src/contexts/ChatContext.js
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import api from "../utils/api"; // ✅ only frontend safe code

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (message, resumeData = null) => {
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await api.post("/api/chat", { message, resumeData });

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: response.data.message,
        timestamp: response.data.timestamp,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          content: "Server error. Please try again later.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSuggestions = useCallback(async (section, content) => {
    setIsLoading(true);
    try {
      const response = await api.post("/api/chat/suggestions", {
        section,
        content,
      });

      const suggestionMessage = {
        id: Date.now(),
        type: "ai",
        content: response.data.suggestions,
        timestamp: response.data.timestamp,
        isSuggestion: true,
        section: response.data.section,
      };

      setMessages((prev) => [...prev, suggestionMessage]);
      return response.data.suggestions;
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  const value = useMemo(
    () => ({
      messages,
      isLoading,
      sendMessage,
      getSuggestions,
      clearMessages,
    }),
    [messages, isLoading, sendMessage, getSuggestions, clearMessages]
  );

  return (
    <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
  );
};
