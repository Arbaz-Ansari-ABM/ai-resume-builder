import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Download,
  Edit,
  Share,
  MoreVert,
  Print,
  ArrowBack
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import ModernTemplate from '../templates/ModernTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import TechnicalTemplate from '../templates/TechnicalTemplate';
import { motion } from 'framer-motion';

const ResumePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentResume, fetchResume } = useResume();
  const theme = useTheme();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    const loadResume = async () => {
      try {
        if (currentResume && currentResume._id === id) {
          setResume(currentResume);
        } else {
          const resumeData = await fetchResume(id);
          setResume(resumeData);
        }
      } catch (error) {
        console.error('Failed to load resume:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadResume();
    }
  }, [id, currentResume, fetchResume, navigate]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleEdit = () => {
    navigate(`/builder/${id}`);
    handleMenuClose();
  };

  const handleDownload = () => {
    // This would integrate with a PDF generation library
    window.print();
    handleMenuClose();
  };

  const handleShare = () => {
    setShareDialogOpen(true);
    handleMenuClose();
  };

  const handlePrint = () => {
    window.print();
    handleMenuClose();
  };

  const renderTemplate = () => {
    if (!resume) return null;

    switch (resume.template || 'modern') {
      case 'modern':
        return <ModernTemplate resume={resume} />;
      case 'classic':
        return <ClassicTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'minimal':
        return <MinimalTemplate resume={resume} />;
      case 'elegant':
        return <ElegantTemplate resume={resume} />;
      case 'technical':
        return <TechnicalTemplate resume={resume} />;
      default:
        return <ModernTemplate resume={resume} />;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <Typography>Loading resume...</Typography>
        </Box>
      </Container>
    );
  }

  if (!resume) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          Resume not found
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid #e5e7eb',
          py: 2,
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton onClick={() => navigate('/dashboard')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {resume.title}
              </Typography>
            </Box>
            
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleDownload}
              >
                Download PDF
              </Button>
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Resume Preview */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: '8.5in',
              margin: '0 auto',
              bgcolor: 'white',
              minHeight: '11in',
              p: 4,
              '@media print': {
                boxShadow: 'none',
                margin: 0,
                maxWidth: 'none',
                minHeight: 'auto'
              }
            }}
          >
            {renderTemplate()}
          </Paper>
        </motion.div>
      </Container>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1 }} />
          Edit Resume
        </MenuItem>
        <MenuItem onClick={handleDownload}>
          <Download sx={{ mr: 1 }} />
          Download PDF
        </MenuItem>
        <MenuItem onClick={handlePrint}>
          <Print sx={{ mr: 1 }} />
          Print
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <Share sx={{ mr: 1 }} />
          Share
        </MenuItem>
      </Menu>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Resume</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Share this resume with potential employers or colleagues.
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShareDialogOpen(false);
              }}
            >
              Copy Link
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                // Implement email sharing
                const subject = `Resume: ${resume.title}`;
                const body = `Please find my resume attached.`;
                window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
                setShareDialogOpen(false);
              }}
            >
              Email
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResumePreview;
