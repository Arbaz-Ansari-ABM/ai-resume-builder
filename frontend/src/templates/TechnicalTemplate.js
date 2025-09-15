import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';

// Technical template: monospace headings, emphasis on skills/tech, subtle grid lines
const TechnicalTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, projects } = resume;
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '');
  const range = (s, e, c=false) => `${formatDate(s)} - ${c ? 'Present' : formatDate(e)}`;

  const H = ({ children }) => (
    <Typography variant="h6" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontWeight: 800, color: '#0f172a', mb: 1 }}>{children}</Typography>
  );

  return (
    <Box sx={{ fontFamily: 'Inter, system-ui, Arial, sans-serif', lineHeight: 1.65 }}>
      <Box sx={{ mb: 3, border: '1px dashed #e2e8f0', p: 2, borderRadius: 1 }}>
        <Typography variant="h4" sx={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', fontWeight: 900 }}>{personalInfo?.fullName || 'Your Name'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {[personalInfo?.email, personalInfo?.phone, personalInfo?.address].filter(Boolean).join(' | ')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          {personalInfo?.linkedin && <Link href={personalInfo.linkedin} target="_blank" rel="noopener">LinkedIn</Link>}
          {personalInfo?.github && <Link href={personalInfo.github} target="_blank" rel="noopener">GitHub</Link>}
          {personalInfo?.website && <Link href={personalInfo.website} target="_blank" rel="noopener">Portfolio</Link>}
        </Box>
      </Box>

      {personalInfo?.summary && (
        <Box sx={{ mb: 3 }}>
          <H>Summary</H>
          <Typography variant="body2">{personalInfo.summary}</Typography>
        </Box>
      )}

      {skills?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <H>Core Skills</H>
          {skills.map((cat, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#334155' }}>{cat.category}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {cat.items.map((s, si) => (
                  <Chip key={si} label={s} size="small" sx={{ bgcolor: '#f1f5f9' }} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {projects?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <H>Projects</H>
          {projects.map((p, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{p.name}</Typography>
                {p.startDate && <Typography variant="caption" color="text.secondary">{range(p.startDate, p.endDate)}</Typography>}
              </Box>
              {p.description && <Typography variant="body2" sx={{ mt: 0.5 }}>{p.description}</Typography>}
              {p.technologies?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {p.technologies.map((t, ti) => (<Chip key={ti} label={t} size="small" sx={{ bgcolor: '#e2e8f0' }} />))}
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                {p.link && <Link href={p.link} target="_blank" rel="noopener" variant="body2">Live</Link>}
                {p.github && <Link href={p.github} target="_blank" rel="noopener" variant="body2">GitHub</Link>}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {experience?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <H>Experience</H>
          {experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{exp.position}</Typography>
                <Typography variant="caption" color="text.secondary">{range(exp.startDate, exp.endDate, exp.current)}</Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ color: '#0ea5e9', fontWeight: 800 }}>{exp.company}</Typography>
              {exp.location && <Typography variant="caption" color="text.secondary">{exp.location}</Typography>}
              {exp.description && <Typography variant="body2" sx={{ mt: 0.5 }}>{exp.description}</Typography>}
              {exp.achievements?.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0, mt: 0.5 }}>
                  {exp.achievements.map((a, ai) => (<li key={ai}><Typography variant="body2">{a}</Typography></li>))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {education?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <H>Education</H>
          {education.map((edu, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{edu.institution}</Typography>
                <Typography variant="caption" color="text.secondary">{range(edu.startDate, edu.endDate)}</Typography>
              </Box>
              <Typography variant="body2">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Typography>
              {edu.location && <Typography variant="caption" color="text.secondary">{edu.location}</Typography>}
              {edu.gpa && <Typography variant="caption">GPA: {edu.gpa}</Typography>}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TechnicalTemplate;


