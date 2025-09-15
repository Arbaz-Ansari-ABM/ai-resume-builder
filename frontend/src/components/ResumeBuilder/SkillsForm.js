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
  Chip,
  Autocomplete
} from '@mui/material';
import {
  Add,
  Delete,
  Code
} from '@mui/icons-material';

const SkillsForm = ({ data, onChange }) => {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML', 'CSS',
    'TypeScript', 'Angular', 'Vue.js', 'Express.js', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'Kubernetes', 'Git', 'Linux', 'Agile', 'Scrum',
    'Project Management', 'Leadership', 'Communication', 'Problem Solving',
    'Data Analysis', 'Machine Learning', 'AI', 'Blockchain', 'DevOps'
  ];

  const handleAddCategory = () => {
    const newCategory = {
      category: '',
      items: []
    };
    onChange([...data, newCategory]);
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

  const handleSkillChange = (catIndex, skills) => {
    const updatedData = [...data];
    updatedData[catIndex].items = skills;
    onChange(updatedData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Skills
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddCategory}
          size="small"
        >
          Add Category
        </Button>
      </Box>

      {data.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50' }}>
          <CardContent>
            <Code sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No skills added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your skills organized by category to showcase your expertise
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddCategory}
            >
              Add Your First Skill Category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {data.map((skillCategory, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Category #{index + 1}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(index)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <TextField
                    fullWidth
                    label="Category Name"
                    value={skillCategory.category || ''}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                    placeholder="e.g., Programming Languages, Tools, Soft Skills"
                    sx={{ mb: 2 }}
                  />

                  <Autocomplete
                    multiple
                    freeSolo
                    options={commonSkills}
                    value={skillCategory.items || []}
                    onChange={(event, newValue) => handleSkillChange(index, newValue)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, optionIndex) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index: optionIndex })}
                          key={optionIndex}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        placeholder="Type or select skills..."
                        helperText="Press Enter to add custom skills"
                      />
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Quick Add Common Skills */}
      {data.length > 0 && (
        <Card sx={{ mt: 3, bgcolor: 'primary.50' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Add Common Skills
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {commonSkills.slice(0, 12).map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  onClick={() => {
                    // Add to first category or create new one
                    if (data.length === 0) {
                      handleAddCategory();
                    }
                    const firstCategory = data[0];
                    if (firstCategory && !firstCategory.items.includes(skill)) {
                      handleSkillChange(0, [...firstCategory.items, skill]);
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SkillsForm;
