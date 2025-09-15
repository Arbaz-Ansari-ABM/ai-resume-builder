# AI Resume Builder

A modern, AI-powered resume builder built with the MERN stack. Create professional resumes with the help of an intelligent chatbot assistant.

## Features

- 🤖 **AI-Powered Assistant**: Get personalized suggestions and improvements for your resume
- 📝 **Easy Resume Building**: Intuitive step-by-step form with drag-and-drop interface
- 🎨 **Beautiful Templates**: Multiple professionally designed resume templates
- 💾 **Real-time Saving**: Auto-save your progress as you build
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 🔒 **Secure & Private**: Your data is encrypted and never shared
- 📄 **PDF Export**: Download your resume as a professional PDF
- 🚀 **Fast & Modern**: Built with the latest web technologies

## Personal Info (Demo / Default Profile)

- **Name:** Arbaz Ahmad Ansari  
- **Email:** arbazahmadansari03@gmail.com  
- **Phone:** 7983297137  
- **Education:** MCA Student, Galgotias University  
- **Skills:** MERN Stack Developer  

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for data storage
- **JWT** for authentication
- **OpenAI API** for AI assistance
- **bcryptjs** for password hashing

### Frontend
- **React 18** with hooks
- **Material-UI** for beautiful components
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Axios** for API calls

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-builder
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
   JWT_SECRET=your_jwt_secret_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development servers**

   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## Usage

1. **Create an Account**: Sign up with your email and password
2. **Build Your Resume**: Use the step-by-step form to add your information
3. **Get AI Help**: Click the chat button to get suggestions from the AI assistant
4. **Choose Template**: Select from beautiful resume templates
5. **Preview & Download**: Preview your resume and download as PDF

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get all user resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume

### AI Chat
- `POST /api/chat` - Send message to AI assistant
- `POST /api/chat/suggestions` - Get resume suggestions

## Project Structure

```
ai-resume-builder/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── contexts/    # React contexts
│   │   ├── templates/   # Resume templates
│   │   └── App.js       # Main app component
│   └── public/          # Static files
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using React, Node.js, and AI
