import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import {
  CheckCircle,
  Palette
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const TemplateSelection = ({ selectedTemplate, onTemplateSelect, onTemplateConfirm, resumeData }) => {
  const theme = useTheme();

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with modern typography',
      preview: '/api/placeholder/300/400',
      color: theme.palette.primary.main,
      features: ['Professional', 'ATS-Friendly', 'Clean Layout']
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional design perfect for conservative industries',
      preview: '/api/placeholder/300/400',
      color: theme.palette.secondary.main,
      features: ['Traditional', 'Conservative', 'Timeless']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and colorful design for creative professionals',
      preview: '/api/placeholder/300/400',
      color: theme.palette.success.main,
      features: ['Creative', 'Colorful', 'Unique']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Whitespace-focused, minimal typography and clean dividers',
      preview: '/api/placeholder/300/400',
      color: theme.palette.info.main,
      features: ['Minimal', 'Clean', 'Focused']
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Serif headings with refined gold accents',
      preview: '/api/placeholder/300/400',
      color: '#b45309',
      features: ['Elegant', 'Serif', 'Refined']
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Monospace flair with emphasis on tech stacks',
      preview: '/api/placeholder/300/400',
      color: '#0ea5e9',
      features: ['Technical', 'Monospace', 'ATS Friendly']
    }
  ];

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

  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Choose Your Template
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Select a template that best represents your professional style
        </Typography>
      </Box>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={template.id}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    border: selectedTemplate === template.id ? `3px solid ${template.color}` : '1px solid #e0e0e0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: 10
                    }
                  }}
                  onClick={() => onTemplateSelect(template.id)}
                  elevation={selectedTemplate === template.id ? 8 : 2}
                >
                  {selectedTemplate === template.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        zIndex: 1
                      }}
                    >
                      <CheckCircle sx={{ color: template.color, fontSize: 32 }} />
                    </Box>
                  )}
                  
                  <CardMedia
                    component="div"
                    sx={{
                      height: 220,
                      bgcolor: 'grey.50',
                      display: 'flex',
                      alignItems: 'stretch',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      p: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: 'white',
                        borderRadius: 1,
                        border: `1px solid ${template.color}`,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Box sx={{ height: 28, bgcolor: template.color }} />
                      <Box sx={{ p: 1.5, display: 'flex', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ height: 10, bgcolor: 'grey.300', mb: 0.5, width: '60%' }} />
                          <Box sx={{ height: 8, bgcolor: 'grey.200', mb: 0.5, width: '70%' }} />
                          <Box sx={{ height: 8, bgcolor: 'grey.200', mb: 0.5, width: '50%' }} />
                          <Box sx={{ height: 8, bgcolor: 'grey.200', width: '65%' }} />
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5, alignContent: 'flex-start' }}>
                          {[...(resumeData?.skills?.[0]?.items || [])].slice(0, 6).map((s, i) => (
                            <Chip key={i} label={s} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    </Box>

                    {/* Quick actions overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        right: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        pointerEvents: 'none'
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="inherit"
                        onClick={(e) => { e.stopPropagation(); onTemplateSelect(template.id); }}
                        sx={{ pointerEvents: 'auto', bgcolor: 'white' }}
                      >
                        Select
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) => { e.stopPropagation(); onTemplateSelect(template.id); if (onTemplateConfirm) onTemplateConfirm(); }}
                        sx={{ pointerEvents: 'auto' }}
                      >
                        Preview
                      </Button>
                    </Box>
                  </CardMedia>
                  
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Palette sx={{ color: template.color, fontSize: 20 }} />
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {template.name}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {template.description}
                    </Typography>
                    
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {template.features.map((feature) => (
                        <Chip
                          key={feature}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.75rem',
                            borderColor: template.color,
                            color: template.color
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {selectedTemplate && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600
            }}
            onClick={() => {
              if (onTemplateConfirm) onTemplateConfirm();
            }}
          >
            Continue with {templates.find(t => t.id === selectedTemplate)?.name} Template
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TemplateSelection;
