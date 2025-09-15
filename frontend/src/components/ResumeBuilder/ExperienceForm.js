import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import {
  Add,
  Delete,
  Work
} from '@mui/icons-material';

const ExperienceForm = ({ data, onChange }) => {
  const handleAddExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    onChange([...data, newExperience]);
  };

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    onChange(updatedData);
  };

  const handleRemove = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  const handleAchievementChange = (expIndex, achIndex, value) => {
    const updatedData = [...data];
    updatedData[expIndex].achievements[achIndex] = value;
    onChange(updatedData);
  };

  const handleAddAchievement = (expIndex) => {
    const updatedData = [...data];
    updatedData[expIndex].achievements.push('');
    onChange(updatedData);
  };

  const handleRemoveAchievement = (expIndex, achIndex) => {
    const updatedData = [...data];
    updatedData[expIndex].achievements.splice(achIndex, 1);
    onChange(updatedData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Work Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddExperience}
          size="small"
        >
          Add Experience
        </Button>
      </Box>

      {data.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50' }}>
          <CardContent>
            <Work sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No work experience added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your work experience to showcase your professional background
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddExperience}
            >
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {data.map((experience, index) => (
            <Grid size={12} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Experience #{index + 1}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(index)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Company"
                        value={experience.company || ''}
                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        value={experience.position || ''}
                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={experience.location || ''}
                        onChange={(e) => handleChange(index, 'location', e.target.value)}
                        placeholder="City, State"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="month"
                        value={experience.startDate || ''}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="End Date"
                        type="month"
                        value={experience.endDate || ''}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        disabled={experience.current}
                      />
                    </Grid>
                    <Grid size={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={experience.current || false}
                            onChange={(e) => handleChange(index, 'current', e.target.checked)}
                          />
                        }
                        label="I currently work here"
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Job Description"
                        multiline
                        rows={3}
                        value={experience.description || ''}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        placeholder="Describe your role and responsibilities..."
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Key Achievements
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<Add />}
                          onClick={() => handleAddAchievement(index)}
                        >
                          Add Achievement
                        </Button>
                      </Box>
                      
                      {experience.achievements.map((achievement, achIndex) => (
                        <Box key={achIndex} display="flex" alignItems="center" gap={1} mb={1}>
                          <TextField
                            fullWidth
                            size="small"
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                            placeholder="Enter a key achievement..."
                          />
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveAchievement(index, achIndex)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExperienceForm;
