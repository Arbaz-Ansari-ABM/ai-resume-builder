import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';

// Minimal template: lots of whitespace, thin dividers, sans-serif
const MinimalTemplate = ({ resume }) => {
  const { personalInfo, experience, education, skills, projects } = resume;

  const Section = ({ title, children }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: 1, color: '#111', mb: 1 }}>
        {title}
      </Typography>
      <Box sx={{ height: 1, bgcolor: '#e5e7eb', mb: 1 }} />
      {children}
    </Box>
  );

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '');
  const dateRange = (s, e, cur=false) => `${formatDate(s)} - ${cur ? 'Present' : formatDate(e)}`;

  return (
    <Box sx={{ fontFamily: 'Inter, system-ui, Arial, sans-serif', lineHeight: 1.6 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>{personalInfo?.fullName || 'Your Name'}</Typography>
        <Typography variant="body2" color="text.secondary">
          {[personalInfo?.email, personalInfo?.phone, personalInfo?.address].filter(Boolean).join(' • ')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
          {personalInfo?.linkedin && <Link href={personalInfo.linkedin} target="_blank" rel="noopener">LinkedIn</Link>}
          {personalInfo?.github && <Link href={personalInfo.github} target="_blank" rel="noopener">GitHub</Link>}
          {personalInfo?.website && <Link href={personalInfo.website} target="_blank" rel="noopener">Portfolio</Link>}
        </Box>
      </Box>

      {personalInfo?.summary && (
        <Section title="SUMMARY">
          <Typography variant="body2" sx={{ textAlign: 'justify' }}>{personalInfo.summary}</Typography>
        </Section>
      )}

      {experience?.length > 0 && (
        <Section title="EXPERIENCE">
          {experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{exp.position}</Typography>
                <Typography variant="caption" color="text.secondary">{dateRange(exp.startDate, exp.endDate, exp.current)}</Typography>
              </Box>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>{exp.company}</Typography>
              {exp.location && <Typography variant="caption" color="text.secondary">{exp.location}</Typography>}
              {exp.description && <Typography variant="body2" sx={{ mt: 0.5 }}>{exp.description}</Typography>}
              {exp.achievements?.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0, mt: 0.5 }}>
                  {exp.achievements.map((a, ai) => (<li key={ai}><Typography variant="body2">{a}</Typography></li>))}
                </Box>
              )}
            </Box>
          ))}
        </Section>
      )}

      {education?.length > 0 && (
        <Section title="EDUCATION">
          {education.map((edu, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{edu.institution}</Typography>
                <Typography variant="caption" color="text.secondary">{dateRange(edu.startDate, edu.endDate)}</Typography>
              </Box>
              <Typography variant="body2">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</Typography>
              {edu.location && <Typography variant="caption" color="text.secondary">{edu.location}</Typography>}
              {edu.gpa && <Typography variant="caption">GPA: {edu.gpa}</Typography>}
              {edu.achievements?.length > 0 && (
                <Box component="ul" sx={{ pl: 2, m: 0, mt: 0.5 }}>
                  {edu.achievements.map((a, ai) => (<li key={ai}><Typography variant="body2">{a}</Typography></li>))}
                </Box>
              )}
            </Box>
          ))}
        </Section>
      )}

      {skills?.length > 0 && (
        <Section title="SKILLS">
          {skills.map((cat, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{cat.category}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {cat.items.map((s, si) => (<Chip key={si} label={s} size="small" variant="outlined" />))}
              </Box>
            </Box>
          ))}
        </Section>
      )}

      {projects?.length > 0 && (
        <Section title="PROJECTS">
          {projects.map((p, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{p.name}</Typography>
                {p.startDate && <Typography variant="caption" color="text.secondary">{dateRange(p.startDate, p.endDate)}</Typography>}
              </Box>
              {p.description && <Typography variant="body2" sx={{ mt: 0.5 }}>{p.description}</Typography>}
              {p.technologies?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {p.technologies.map((t, ti) => (<Chip key={ti} label={t} size="small" variant="outlined" />))}
                </Box>
              )}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                {p.link && <Link href={p.link} target="_blank" rel="noopener" variant="body2">Live</Link>}
                {p.github && <Link href={p.github} target="_blank" rel="noopener" variant="body2">GitHub</Link>}
              </Box>
            </Box>
          ))}
        </Section>
      )}
    </Box>
  );
};

export default MinimalTemplate;


