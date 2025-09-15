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
  Divider
} from '@mui/material';
import {
  Add,
  Delete,
  School
} from '@mui/icons-material';

const EducationForm = ({ data, onChange }) => {
  const handleAddEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    };
    onChange([...data, newEducation]);
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

  const handleAchievementChange = (eduIndex, achIndex, value) => {
    const updatedData = [...data];
    updatedData[eduIndex].achievements[achIndex] = value;
    onChange(updatedData);
  };

  const handleAddAchievement = (eduIndex) => {
    const updatedData = [...data];
    updatedData[eduIndex].achievements.push('');
    onChange(updatedData);
  };

  const handleRemoveAchievement = (eduIndex, achIndex) => {
    const updatedData = [...data];
    updatedData[eduIndex].achievements.splice(achIndex, 1);
    onChange(updatedData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Education
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEducation}
          size="small"
        >
          Add Education
        </Button>
      </Box>

      {data.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50' }}>
          <CardContent>
            <School sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No education added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your educational background to showcase your qualifications
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddEducation}
            >
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {data.map((education, index) => (
            <Grid size={12} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Education #{index + 1}
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
                        label="Institution"
                        value={education.institution || ''}
                        onChange={(e) => handleChange(index, 'institution', e.target.value)}
                        required
                        placeholder="University Name"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Location"
                        value={education.location || ''}
                        onChange={(e) => handleChange(index, 'location', e.target.value)}
                        placeholder="City, State"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Degree"
                        value={education.degree || ''}
                        onChange={(e) => handleChange(index, 'degree', e.target.value)}
                        required
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Field of Study"
                        value={education.field || ''}
                        onChange={(e) => handleChange(index, 'field', e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="month"
                        value={education.startDate || ''}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <TextField
                        fullWidth
                        label="End Date"
                        type="month"
                        value={education.endDate || ''}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        placeholder="Leave empty if ongoing"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="GPA (Optional)"
                        value={education.gpa || ''}
                        onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                        placeholder="3.8"
                        helperText="Only include if 3.5 or higher"
                      />
                    </Grid>
                    
                    <Grid size={12}>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Academic Achievements
                        </Typography>
                        <Button
                          size="small"
                          startIcon={<Add />}
                          onClick={() => handleAddAchievement(index)}
                        >
                          Add Achievement
                        </Button>
                      </Box>
                      
                      {education.achievements.map((achievement, achIndex) => (
                        <Box key={achIndex} display="flex" alignItems="center" gap={1} mb={1}>
                          <TextField
                            fullWidth
                            size="small"
                            value={achievement}
                            onChange={(e) => handleAchievementChange(index, achIndex, e.target.value)}
                            placeholder="Enter an academic achievement..."
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

export default EducationForm;
