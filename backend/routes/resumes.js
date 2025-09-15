const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all resumes for a user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new resume
router.post('/', auth, async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user._id
    };

    const resume = new Resume(resumeData);
    await resume.save();

    res.status(201).json(resume);
  } catch (error) {
    console.error('Create resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Duplicate a resume
router.post('/:id/duplicate', auth, async (req, res) => {
  try {
    const originalResume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!originalResume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const resumeData = originalResume.toObject();
    delete resumeData._id;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;
    resumeData.title = `${originalResume.title} (Copy)`;

    const newResume = new Resume(resumeData);
    await newResume.save();

    res.status(201).json(newResume);
  } catch (error) {
    console.error('Duplicate resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
