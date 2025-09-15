import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Fab,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Save,
  Preview,
  SmartToy,
  Close,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { useChat } from '../contexts/ChatContext';
import PersonalInfoForm from '../components/ResumeBuilder/PersonalInfoForm';
import ExperienceForm from '../components/ResumeBuilder/ExperienceForm';
import EducationForm from '../components/ResumeBuilder/EducationForm';
import SkillsForm from '../components/ResumeBuilder/SkillsForm';
import ProjectsForm from '../components/ResumeBuilder/ProjectsForm';
import TemplateSelection from '../components/ResumeBuilder/TemplateSelection';
import ChatBot from '../components/ChatBot';
import { motion } from 'framer-motion';

const steps = [
  'Personal Info',
  'Experience',
  'Education',
  'Skills',
  'Projects',
  'Template'
];

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchResume, createResume, updateResume } = useResume();
  const { clearMessages } = useChat();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: 'My Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    template: 'modern'
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchResume(id).then(resume => {
        if (resume) {
          setResumeData(resume);
        }
      });
    }
  }, [id, fetchResume]);

  useEffect(() => {
    // Clear chat messages when switching resumes
    clearMessages();
  }, [id, clearMessages]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleDataChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (id) {
        await updateResume(id, resumeData);
      } else {
        const newResume = await createResume(resumeData);
        navigate(`/builder/${newResume._id}`, { replace: true });
      }
    } catch (error) {
      console.error('Failed to save resume:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmTemplate = async () => {
    try {
      if (id) {
        await updateResume(id, { ...resumeData, template: resumeData.template });
        navigate(`/preview/${id}`);
      } else {
        const newResume = await createResume(resumeData);
        navigate(`/preview/${newResume._id}`);
      }
    } catch (error) {
      console.error('Failed to confirm template:', error);
    }
  };

  const handlePreview = () => {
    if (id) {
      navigate(`/preview/${id}`);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => handleDataChange('personalInfo', data)}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onChange={(data) => handleDataChange('experience', data)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => handleDataChange('education', data)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => handleDataChange('skills', data)}
          />
        );
      case 4:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(data) => handleDataChange('projects', data)}
          />
        );
      case 5:
        return (
          <TemplateSelection
            selectedTemplate={resumeData.template}
            onTemplateSelect={(template) => handleDataChange('template', template)}
            onTemplateConfirm={handleConfirmTemplate}
            resumeData={resumeData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton onClick={() => navigate('/dashboard')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {id ? 'Edit Resume' : 'Create New Resume'}
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<Preview />}
                onClick={handlePreview}
                disabled={!id}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Box>

          {/* Stepper */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    onClick={() => handleStepClick(index)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Step Content */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paper sx={{ p: 3 }}>
              {renderStepContent(activeStep)}
            </Paper>
          </motion.div>

          {/* Navigation */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : 400,
            height: '100%'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Assistant
          </Typography>
          <IconButton onClick={() => setIsChatOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <ChatBot resumeData={resumeData} />
      </Drawer>

      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000
        }}
        onClick={() => setIsChatOpen(true)}
      >
        <SmartToy />
      </Fab>
    </Box>
  );
};

export default ResumeBuilder;
