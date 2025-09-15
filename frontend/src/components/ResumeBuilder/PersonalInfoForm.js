import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box
} from '@mui/material';

const PersonalInfoForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        Personal Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Phone Number"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Location"
            value={data.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="City, State"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="GitHub Profile"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/yourusername"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Website/Portfolio"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Professional Summary"
            multiline
            rows={4}
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Write a brief summary of your professional background and key strengths..."
            helperText="This will appear at the top of your resume"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm;
