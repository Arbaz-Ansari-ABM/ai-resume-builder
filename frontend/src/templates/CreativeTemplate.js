import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Link
} from '@mui/material';

// Creative template: bold header bar and accent colors
const CreativeTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, projects } = resume;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const formatDateRange = (startDate, endDate, current = false) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  const accent = '#ec4899';

  return (
    <Box sx={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif', lineHeight: 1.7 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ bgcolor: accent, color: 'white', p: 3, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>
            {personalInfo?.fullName || 'Your Name'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1, opacity: 0.95 }}>
            {personalInfo?.email && <Typography variant="body2">{personalInfo.email}</Typography>}
            {personalInfo?.phone && <Typography variant="body2">{personalInfo.phone}</Typography>}
            {personalInfo?.address && <Typography variant="body2">{personalInfo.address}</Typography>}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          {personalInfo?.linkedin && (<Link href={personalInfo.linkedin} target="_blank" rel="noopener">LinkedIn</Link>)}
          {personalInfo?.github && (<Link href={personalInfo.github} target="_blank" rel="noopener">GitHub</Link>)}
          {personalInfo?.website && (<Link href={personalInfo.website} target="_blank" rel="noopener">Portfolio</Link>)}
        </Box>
      </Box>

      {personalInfo?.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 1 }}>
            Summary
          </Typography>
          <Typography variant="body2">{personalInfo.summary}</Typography>
        </Box>
      )}

      {experience && experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 2 }}>
            Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2, borderLeft: `3px solid ${accent}`, pl: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{exp.position}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: accent }}>{exp.company}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Typography>
              </Box>
              {exp.location && (<Typography variant="body2" color="text.secondary">{exp.location}</Typography>)}
              {exp.description && (<Typography variant="body2" sx={{ mt: 0.5 }}>{exp.description}</Typography>)}
              {exp.achievements && exp.achievements.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}><Typography variant="body2">{achievement}</Typography></li>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {education && education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 2 }}>
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2, borderLeft: `3px solid ${accent}`, pl: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{edu.degree} {edu.field && `in ${edu.field}`}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: accent }}>{edu.institution}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{formatDateRange(edu.startDate, edu.endDate)}</Typography>
              </Box>
              {edu.location && (<Typography variant="body2" color="text.secondary">{edu.location}</Typography>)}
              {edu.gpa && (<Typography variant="body2">GPA: {edu.gpa}</Typography>)}
              {edu.achievements && edu.achievements.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {edu.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}><Typography variant="body2">{achievement}</Typography></li>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {skills && skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 2 }}>
            Skills
          </Typography>
          {skills.map((skillCategory, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5 }}>{skillCategory.category}:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {skillCategory.items.map((skill, skillIndex) => (
                  <Chip key={skillIndex} label={skill} size="small" variant="outlined" sx={{ borderColor: accent, color: accent, fontSize: '0.75rem' }} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {projects && projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1f2937', mb: 2 }}>
            Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{project.name}</Typography>
                {project.startDate && (
                  <Typography variant="body2" color="text.secondary">{formatDateRange(project.startDate, project.endDate)}</Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>{project.description}</Typography>
              {project.technologies && project.technologies.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip key={techIndex} label={tech} size="small" variant="outlined" sx={{ borderColor: accent, color: accent, fontSize: '0.75rem' }} />
                  ))}
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.link && (<Link href={project.link} target="_blank" rel="noopener" variant="body2">Live Demo</Link>)}
                {project.github && (<Link href={project.github} target="_blank" rel="noopener" variant="body2">GitHub</Link>)}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CreativeTemplate;


