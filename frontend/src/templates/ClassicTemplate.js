import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Link
} from '@mui/material';

// Classic template: conservative typography and neutral accents
const ClassicTemplate = ({ resume }) => {
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

  const accent = '#2f2f2f';

  return (
    <Box sx={{ fontFamily: 'Georgia, serif', lineHeight: 1.6 }}>
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: '#111', mb: 1, letterSpacing: 0.5 }}
        >
          {personalInfo?.fullName || 'Your Name'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', color: 'text.secondary' }}>
          {personalInfo?.email && <Typography variant="body2">{personalInfo.email}</Typography>}
          {personalInfo?.phone && <Typography variant="body2">{personalInfo.phone}</Typography>}
          {personalInfo?.address && <Typography variant="body2">{personalInfo.address}</Typography>}
        </Box>
      </Box>

      {personalInfo?.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: accent, mb: 1, borderBottom: `2px solid ${accent}`, pb: 0.5 }}>
            PROFESSIONAL SUMMARY
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>{personalInfo.summary}</Typography>
        </Box>
      )}

      {experience && experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: accent, mb: 2, borderBottom: `2px solid ${accent}`, pb: 0.5 }}>
            PROFESSIONAL EXPERIENCE
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{exp.position}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: accent }}>{exp.company}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{formatDateRange(exp.startDate, exp.endDate, exp.current)}</Typography>
              </Box>
              {exp.location && (<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{exp.location}</Typography>)}
              {exp.description && (<Typography variant="body2" sx={{ mb: 1 }}>{exp.description}</Typography>)}
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
          <Typography variant="h6" sx={{ fontWeight: 700, color: accent, mb: 2, borderBottom: `2px solid ${accent}`, pb: 0.5 }}>
            EDUCATION
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{edu.degree} {edu.field && `in ${edu.field}`}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: accent }}>{edu.institution}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">{formatDateRange(edu.startDate, edu.endDate)}</Typography>
              </Box>
              {edu.location && (<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{edu.location}</Typography>)}
              {edu.gpa && (<Typography variant="body2" sx={{ mb: 1 }}>GPA: {edu.gpa}</Typography>)}
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
          <Typography variant="h6" sx={{ fontWeight: 700, color: accent, mb: 2, borderBottom: `2px solid ${accent}`, pb: 0.5 }}>
            SKILLS
          </Typography>
          {skills.map((skillCategory, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>{skillCategory.category}:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {skillCategory.items.map((skill, skillIndex) => (
                  <Chip key={skillIndex} label={skill} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {projects && projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: accent, mb: 2, borderBottom: `2px solid ${accent}`, pb: 0.5 }}>
            PROJECTS
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{project.name}</Typography>
                {project.startDate && (
                  <Typography variant="body2" color="text.secondary">{formatDateRange(project.startDate, project.endDate)}</Typography>
                )}
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>{project.description}</Typography>
              {project.technologies && project.technologies.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip key={techIndex} label={tech} size="small" variant="outlined" />
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

export default ClassicTemplate;


