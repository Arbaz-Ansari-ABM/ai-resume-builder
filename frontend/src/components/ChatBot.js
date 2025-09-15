import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
  Refresh,
  Lightbulb
} from '@mui/icons-material';
import { useChat } from '../contexts/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = ({ resumeData }) => {
  const { messages, isLoading, sendMessage, getSuggestions, clearMessages } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message, resumeData);
  };

  const handleQuickAction = async (action) => {
    const actionMessages = {
      'improve-summary': 'Can you help me improve my professional summary?',
      'suggest-skills': 'What skills should I add to make my resume stronger?',
      'optimize-experience': 'How can I better describe my work experience?',
      'format-tips': 'What are the best formatting tips for my resume?',
      'ats-optimization': 'How can I optimize my resume for ATS systems?'
    };

    const message = actionMessages[action];
    if (message) {
      await sendMessage(message, resumeData);
    }
  };

  const handleGetSuggestions = async (section) => {
    const sectionData = resumeData[section];
    if (sectionData && sectionData.length > 0) {
      await getSuggestions(section, JSON.stringify(sectionData, null, 2));
    } else {
      await sendMessage(`I need help with my ${section} section. What should I include?`, resumeData);
    }
  };

  const quickActions = [
    { id: 'improve-summary', label: 'Improve Summary', icon: '📝' },
    { id: 'suggest-skills', label: 'Suggest Skills', icon: '💡' },
    { id: 'optimize-experience', label: 'Optimize Experience', icon: '💼' },
    { id: 'format-tips', label: 'Format Tips', icon: '📋' },
    { id: 'ats-optimization', label: 'ATS Optimization', icon: '🤖' }
  ];

  const suggestionSections = [
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            <SmartToy />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Resume Assistant
          </Typography>
        </Box>
        
        {/* Quick Actions */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {quickActions.map((action) => (
            <Chip
              key={action.id}
              label={action.label}
              size="small"
              onClick={() => handleQuickAction(action.id)}
              disabled={isLoading}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>

        {/* Section Suggestions */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Get suggestions for:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {suggestionSections.map((section) => (
              <Button
                key={section.id}
                size="small"
                variant="outlined"
                startIcon={<Lightbulb />}
                onClick={() => handleGetSuggestions(section.id)}
                disabled={isLoading}
                sx={{ fontSize: '0.75rem' }}
              >
                {section.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {messages.length === 0 ? (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <SmartToy sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Hi! I'm your AI resume assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ask me anything about improving your resume, or use the quick actions above to get started.
            </Typography>
          </Box>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  display="flex"
                  gap={1}
                  justifyContent={message.type === 'user' ? 'flex-end' : 'flex-start'}
                >
                  {message.type === 'ai' && (
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      <SmartToy />
                    </Avatar>
                  )}
                  
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '80%',
                      bgcolor: message.type === 'user' ? 'primary.main' : 'grey.100',
                      color: message.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {message.content}
                    </Typography>
                    {message.isSuggestion && (
                      <Chip
                        label="Suggestion"
                        size="small"
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    )}
                    {message.isError && (
                      <Chip
                        label="Error"
                        size="small"
                        color="error"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Paper>

                  {message.type === 'user' && (
                    <Avatar sx={{ bgcolor: 'grey.400', width: 32, height: 32 }}>
                      <Person />
                    </Avatar>
                  )}
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isLoading && (
          <Box display="flex" gap={1} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <SmartToy />
            </Avatar>
            <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} />
                <Typography variant="body2">AI is thinking...</Typography>
              </Box>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb' }}>
        <Box display="flex" gap={1} mb={1}>
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={clearMessages}
            disabled={isLoading}
          >
            Clear Chat
          </Button>
        </Box>
        
        <Box component="form" onSubmit={handleSendMessage} display="flex" gap={1}>
          <TextField
            ref={inputRef}
            fullWidth
            multiline
            maxRows={3}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about your resume..."
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <IconButton
            type="submit"
            color="primary"
            disabled={!inputMessage.trim() || isLoading}
            sx={{ alignSelf: 'flex-end' }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;
