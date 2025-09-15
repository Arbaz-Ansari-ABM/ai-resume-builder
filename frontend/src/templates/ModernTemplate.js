import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Link
} from '@mui/material';

const ModernTemplate = ({ resume }) => {
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

  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 1,
            fontSize: '2rem'
          }}
        >
          {personalInfo?.fullName || 'Your Name'}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {personalInfo?.email && (
            <Typography variant="body2" color="text.secondary">
              {personalInfo.email}
            </Typography>
          )}
          {personalInfo?.phone && (
            <Typography variant="body2" color="text.secondary">
              {personalInfo.phone}
            </Typography>
          )}
          {personalInfo?.address && (
            <Typography variant="body2" color="text.secondary">
              {personalInfo.address}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          {personalInfo?.linkedin && (
            <Link href={personalInfo.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </Link>
          )}
          {personalInfo?.github && (
            <Link href={personalInfo.github} target="_blank" rel="noopener">
              GitHub
            </Link>
          )}
          {personalInfo?.website && (
            <Link href={personalInfo.website} target="_blank" rel="noopener">
              Portfolio
            </Link>
          )}
        </Box>
      </Box>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2c3e50',
              mb: 1,
              borderBottom: '2px solid #3498db',
              pb: 0.5
            }}
          >
            PROFESSIONAL SUMMARY
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>
            {personalInfo.summary}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #3498db',
              pb: 0.5
            }}
          >
            PROFESSIONAL EXPERIENCE
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {exp.position}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 500 }}>
                    {exp.company}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </Typography>
              </Box>
              
              {exp.location && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {exp.location}
                </Typography>
              )}
              
              {exp.description && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {exp.description}
                </Typography>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>
                      <Typography variant="body2">
                        {achievement}
                      </Typography>
                    </li>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #3498db',
              pb: 0.5
            }}
          >
            EDUCATION
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </Typography>
                  <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 500 }}>
                    {edu.institution}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDateRange(edu.startDate, edu.endDate)}
                </Typography>
              </Box>
              
              {edu.location && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {edu.location}
                </Typography>
              )}
              
              {edu.gpa && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  GPA: {edu.gpa}
                </Typography>
              )}
              
              {edu.achievements && edu.achievements.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {edu.achievements.map((achievement, achIndex) => (
                    <li key={achIndex}>
                      <Typography variant="body2">
                        {achievement}
                      </Typography>
                    </li>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #3498db',
              pb: 0.5
            }}
          >
            SKILLS
          </Typography>
          {skills.map((skillCategory, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {skillCategory.category}:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {skillCategory.items.map((skill, skillIndex) => (
                  <Chip
                    key={skillIndex}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#2c3e50',
              mb: 2,
              borderBottom: '2px solid #3498db',
              pb: 0.5
            }}
          >
            PROJECTS
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {project.name}
                </Typography>
                {project.startDate && (
                  <Typography variant="body2" color="text.secondary">
                    {formatDateRange(project.startDate, project.endDate)}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              
              {project.technologies && project.technologies.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              )}
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.link && (
                  <Link href={project.link} target="_blank" rel="noopener" variant="body2">
                    Live Demo
                  </Link>
                )}
                {project.github && (
                  <Link href={project.github} target="_blank" rel="noopener" variant="body2">
                    GitHub
                  </Link>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ModernTemplate;
