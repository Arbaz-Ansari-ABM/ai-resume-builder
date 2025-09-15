#!/bin/bash

echo "🚀 Setting up AI Resume Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Ubuntu: sudo systemctl start mongod"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "📝 Creating .env file..."
    cat > backend/.env << EOF
MONGODB_URI=mongodb://localhost:27017/ai-resume-builder
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
NODE_ENV=development
EOF
    echo "✅ Created backend/.env file"
    echo "⚠️  Please update the GROQ_API_KEY in backend/.env with your actual Groq API key"
fi

echo "✅ Setup complete!"
echo ""
echo "🎯 To start the application:"
echo "   npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo ""
echo "📚 Don't forget to:"
echo "   1. Get a Groq API key from https://console.groq.com/keys"
echo "   2. Update the GROQ_API_KEY in backend/.env"
echo "   3. Make sure MongoDB is running"
