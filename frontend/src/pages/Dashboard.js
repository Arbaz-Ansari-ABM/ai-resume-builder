import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Fab
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  FileCopy,
  Visibility,
  Build
} from '@mui/icons-material';
import { useResume } from '../contexts/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { resumes, loading, fetchResumes, deleteResume, duplicateResume } = useResume();
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  // Resolve demo CV URL by probing common filenames in public/
  const [demoUrl, setDemoUrl] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const candidates = [
      '/Arbaz_CV.pdf',
      "/Arbaz%27s_CV.pdf", // encoded apostrophe
      "/Arbaz's_CV.pdf" // raw apostrophe
    ];
    (async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (!cancelled && res.ok) {
            setDemoUrl(url);
            return;
          }
        } catch (_) {}
      }
      if (!cancelled) setDemoUrl(null);
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleMenuOpen = (event, resume) => {
    setMenuAnchor(event.currentTarget);
    setSelectedResume(resume);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedResume(null);
  };

  const handleEdit = () => {
    navigate(`/builder/${selectedResume._id}`);
    handleMenuClose();
  };

  const handlePreview = () => {
    navigate(`/preview/${selectedResume._id}`);
    handleMenuClose();
  };

  const handleDuplicate = async () => {
    try {
      await duplicateResume(selectedResume._id);
    } catch (error) {
      console.error('Failed to duplicate resume:', error);
    }
    handleMenuClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(selectedResume._id);
      } catch (error) {
        console.error('Failed to delete resume:', error);
      }
    }
    handleMenuClose();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography>Loading your resumes...</Typography>
        </Box>
      </Container>
    );
  }

  

  const fallbackDemoUrl = demoUrl || "/Arbaz%27s_CV.pdf";

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <motion.div variants={itemVariants}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              My Resumes
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and build your professional resumes
            </Typography>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/builder')}
              size="large"
              sx={{ borderRadius: 2 }}
            >
              Create New Resume
            </Button>
          </motion.div>
        </Box>

        {resumes.length === 0 ? (
          <motion.div variants={itemVariants}>
            <Card sx={{ textAlign: 'center', py: 8 }}>
              <CardContent>
                <Build sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  No resumes yet
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Start building your first resume to showcase your skills and experience
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/builder')}
                  size="large"
                >
                  Create Your First Resume
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Grid container spacing={3}>
            {/* Demo CV Card */}
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div variants={itemVariants}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        Demo CV
                      </Typography>
                      <Chip label="Sample" size="small" color="info" variant="outlined" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Arbaz Ahmad Ansari's CV
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      component="a"
                      href={fallbackDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      startIcon={<FileCopy />}
                      component="a"
                      href={fallbackDemoUrl}
                      download={decodeURIComponent(fallbackDemoUrl.replace(/^\//, ''))}
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
            {resumes.map((resume, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resume._id}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        boxShadow: 4
                      }
                    }}
                    onClick={() => navigate(`/builder/${resume._id}`)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {resume.title}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, resume);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {resume.personalInfo?.fullName || 'Untitled Resume'}
                      </Typography>
                      
                      <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                        <Chip
                          label={resume.template || 'Modern'}
                          size="small"
                          variant="outlined"
                        />
                        {resume.isPublic && (
                          <Chip
                            label="Public"
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        Updated {formatDate(resume.updatedAt)}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/builder/${resume._id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${resume._id}`);
                        }}
                      >
                        Preview
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button for mobile */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { xs: 'flex', md: 'none' }
          }}
          onClick={() => navigate('/builder')}
        >
          <Add />
        </Fab>

        {/* Context Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handlePreview}>
            <Visibility sx={{ mr: 1 }} />
            Preview
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <FileCopy sx={{ mr: 1 }} />
            Duplicate
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </motion.div>
    </Container>
  );
};

export default Dashboard;
