import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Build,
  SmartToy,
  Description,
  Speed,
  Security,
  Palette
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Build sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Easy Resume Building',
      description:
        'Create professional resumes with our intuitive drag-and-drop interface. No design skills required.'
    },
    {
      icon: <SmartToy sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'AI-Powered Assistant',
      description:
        'Get personalized suggestions and improvements for your resume with our intelligent chatbot.'
    },
    {
      icon: <Description sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Multiple Templates',
      description:
        'Choose from a variety of professionally designed templates that suit your industry and style.'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Quick Export',
      description:
        'Export your resume as PDF in seconds. Share or download instantly for job applications.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Secure & Private',
      description:
        'Your data is encrypted and secure. We never share your personal information with third parties.'
    },
    {
      icon: <Palette sx={{ fontSize: 40, color: 'error.main' }} />,
      title: 'Customizable Design',
      description:
        'Personalize colors, fonts, and layouts to match your personal brand and preferences.'
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
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Box textAlign="center" mb={6}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  {isAuthenticated
                    ? `Welcome back, ${user?.name || 'User'}!`
                    : 'Build Your Perfect Resume'}
                  <br />
                  {isAuthenticated
                    ? 'Ready to build your next resume?'
                    : 'with AI Assistance'}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{ mb: 4, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}
                >
                  {isAuthenticated
                    ? 'Continue building your professional resume with our AI-powered builder. Access your dashboard or create a new resume.'
                    : 'Create professional resumes in minutes with our AI-powered builder. Get personalized suggestions and choose from beautiful templates.'}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  {isAuthenticated ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        Welcome, {user?.name || 'User'}!
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          opacity: 0.9,
                          fontWeight: 400
                        }}
                      >
                        Ready to build your next resume?
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: 'grey.100'
                          }
                        }}
                      >
                        Get Started Free
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/login')}
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)'
                          }
                        }}
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Why Choose Our Resume Builder?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            We combine cutting-edge AI technology with beautiful design to help
            you create the perfect resume.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          {features.map((feature, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                style={{ width: '100%', maxWidth: 340 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition:
                      'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8]
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                    <Box mb={2}>{feature.icon}</Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      {!isAuthenticated && (
        <Box
          sx={{
            bgcolor: 'primary.50',
            py: 8,
            textAlign: 'center'
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Ready to Build Your Resume?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Join thousands of job seekers who have already created winning
              resumes with our platform.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              Start Building Now
            </Button>
          </Container>
        </Box>
      )}

      {/* Footer */}
      <Box
        sx={{
          bgcolor: 'grey.900',
          color: 'white',
          py: 6,
          mt: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                AI Resume Builder
              </Typography>
              <Typography
                variant="body2"
                color="grey.300"
                sx={{ mb: 2 }}
              >
                Create professional resumes with the power of AI. Build,
                customize, and download your perfect resume in minutes.
              </Typography>
              <Typography variant="body2" color="grey.400">
                 Built with ❤️ using React, Node.js, and AI
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Product
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Features
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Templates
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Pricing
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  AI Assistant
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Support
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Help Center
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Documentation
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Status
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Company
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  About Us
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Blog
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Careers
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Press
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Legal
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Terms of Service
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  Cookie Policy
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.300"
                  sx={{ cursor: 'pointer', '&:hover': { color: 'white' } }}
                >
                  GDPR
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <Typography 
              variant="body2" 
              align="center" 
              sx={{ color: "#fff" }}
              >
              © {new Date().getFullYear()} Arbaz Ahmad Ansari. All rights reserved.
            </Typography>
            <Box display="flex" gap={2}>
              <Typography variant="body2" color="grey.400">
                Made in India 🇮🇳
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
