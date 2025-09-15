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
  FolderOpen
} from '@mui/icons-material';

const ProjectsForm = ({ data, onChange }) => {
  const commonTechnologies = [
    'React', 'Node.js', 'JavaScript', 'Python', 'Java', 'TypeScript',
    'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'Express.js', 'Docker',
    'AWS', 'Git', 'Figma', 'Photoshop', 'Illustrator', 'Sketch'
  ];

  const handleAddProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    onChange([...data, newProject]);
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

  const handleTechnologyChange = (projIndex, technologies) => {
    const updatedData = [...data];
    updatedData[projIndex].technologies = technologies;
    onChange(updatedData);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProject}
          size="small"
        >
          Add Project
        </Button>
      </Box>

      {data.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 4, bgcolor: 'grey.50' }}>
          <CardContent>
            <FolderOpen sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects added yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Add your projects to showcase your practical experience and skills
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddProject}
            >
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {data.map((project, index) => (
            <Grid size={12} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Project #{index + 1}
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
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Project Name"
                        value={project.name || ''}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        required
                        placeholder="e.g., E-commerce Website, Mobile App"
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Project Description"
                        multiline
                        rows={3}
                        value={project.description || ''}
                        onChange={(e) => handleChange(index, 'description', e.target.value)}
                        placeholder="Describe what the project does, its purpose, and key features..."
                        required
                      />
                    </Grid>
                    <Grid size={12}>
                      <Autocomplete
                        multiple
                        freeSolo
                        options={commonTechnologies}
                        value={project.technologies || []}
                        onChange={(event, newValue) => handleTechnologyChange(index, newValue)}
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
                            label="Technologies Used"
                            placeholder="Select or type technologies..."
                            helperText="Press Enter to add custom technologies"
                          />
                        )}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Live Demo Link"
                        value={project.link || ''}
                        onChange={(e) => handleChange(index, 'link', e.target.value)}
                        placeholder="https://yourproject.com"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="GitHub Repository"
                        value={project.github || ''}
                        onChange={(e) => handleChange(index, 'github', e.target.value)}
                        placeholder="https://github.com/username/repo"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Start Date"
                        type="month"
                        value={project.startDate || ''}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="End Date"
                        type="month"
                        value={project.endDate || ''}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        placeholder="Leave empty if ongoing"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Quick Add Common Technologies */}
      {data.length > 0 && (
        <Card sx={{ mt: 3, bgcolor: 'primary.50' }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Add Common Technologies
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {commonTechnologies.slice(0, 15).map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  onClick={() => {
                    // Add to first project or create new one
                    if (data.length === 0) {
                      handleAddProject();
                    }
                    const firstProject = data[0];
                    if (firstProject && !firstProject.technologies.includes(tech)) {
                      handleTechnologyChange(0, [...firstProject.technologies, tech]);
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

export default ProjectsForm;
