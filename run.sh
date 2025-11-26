#!/bin/bash

# Sugarcane Disease Detection - Startup Script

echo "==================================="
echo "Sugarcane Disease Detection"
echo "==================================="
echo ""

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "ERROR: backend/.env file not found!"
    echo "Please create backend/.env with your ANTHROPIC_API_KEY"
    echo ""
    echo "Example:"
    echo "  cd backend"
    echo "  cp .env.example .env"
    echo "  # Then edit .env and add your API key"
    exit 1
fi

# Start backend in background
echo "Starting backend server..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt
python app.py &
BACKEND_PID=$!
cd ..

echo "Backend started (PID: $BACKEND_PID)"
sleep 2

# Start frontend in background
echo "Starting frontend server..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "==================================="
echo "Servers are running!"
echo "==================================="
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "==================================="
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Keep script running
wait
