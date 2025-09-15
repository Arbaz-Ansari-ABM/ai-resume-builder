const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    website: String,
    summary: String
  },
  experience: [{
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
    achievements: [String]
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    location: String,
    startDate: String,
    endDate: String,
    gpa: String,
    achievements: [String]
  }],
  skills: [{
    category: String,
    items: [String]
  }],
  projects: [{
    name: String,
    description: String,
    technologies: [String],
    link: String,
    github: String,
    startDate: String,
    endDate: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    credentialId: String,
    link: String
  }],
  languages: [{
    language: String,
    proficiency: String
  }],
  template: {
    type: String,
    default: 'modern'
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
