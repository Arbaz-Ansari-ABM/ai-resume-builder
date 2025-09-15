import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import api from '../utils/api';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Failed to fetch resumes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchResume = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/resumes/${id}`);
      setCurrentResume(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch resume:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createResume = useCallback(async (resumeData) => {
    try {
      const response = await api.post('/api/resumes', resumeData);
      const newResume = response.data;
      setResumes(prev => [newResume, ...prev]);
      setCurrentResume(newResume);
      return newResume;
    } catch (error) {
      console.error('Failed to create resume:', error);
      throw error;
    }
  }, []);

  const updateResume = useCallback(async (id, resumeData) => {
    try {
      const response = await api.put(`/api/resumes/${id}`, resumeData);
      const updatedResume = response.data;
      
      setResumes(prev => 
        prev.map(resume => 
          resume._id === id ? updatedResume : resume
        )
      );
      
      if (currentResume && currentResume._id === id) {
        setCurrentResume(updatedResume);
      }
      
      return updatedResume;
    } catch (error) {
      console.error('Failed to update resume:', error);
      throw error;
    }
  }, [currentResume]);

  const deleteResume = useCallback(async (id) => {
    try {
      await api.delete(`/api/resumes/${id}`);
      setResumes(prev => prev.filter(resume => resume._id !== id));
      
      if (currentResume && currentResume._id === id) {
        setCurrentResume(null);
      }
    } catch (error) {
      console.error('Failed to delete resume:', error);
      throw error;
    }
  }, [currentResume]);

  const duplicateResume = useCallback(async (id) => {
    try {
      const response = await api.post(`/api/resumes/${id}/duplicate`);
      const duplicatedResume = response.data;
      setResumes(prev => [duplicatedResume, ...prev]);
      return duplicatedResume;
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
      throw error;
    }
  }, []);

  const value = useMemo(() => ({
    resumes,
    currentResume,
    loading,
    fetchResumes,
    fetchResume,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    setCurrentResume
  }), [resumes, currentResume, loading, fetchResumes, fetchResume, createResume, updateResume, deleteResume, duplicateResume]);

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
