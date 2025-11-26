# Quick Start Guide

Get the Sugarcane Disease Detection app running in 5 minutes!

## Step 1: Get Your API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

## Step 2: Set Up Backend

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
# Replace 'your_api_key_here' with your actual API key

# Start backend server
python app.py
```

Backend should now be running at http://localhost:8000

## Step 3: Set Up Frontend

Open a **new terminal window**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend should now be running at http://localhost:5173

## Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Click on **Detection** in the navigation
3. Upload a sugarcane image or use your webcam
4. Click **Analyze Image**
5. View the disease detection results!

## Troubleshooting

### Backend won't start
- Check if Python 3.10+ is installed: `python --version`
- Check if API key is set in `.env` file
- Check if port 8000 is available

### Frontend won't start
- Check if Node.js 18+ is installed: `node --version`
- Try deleting `node_modules` and running `npm install` again
- Check if port 5173 is available

### API errors
- Verify your Anthropic API key is valid
- Check if you have API credits remaining
- Check backend logs for error messages

### Camera not working
- Grant camera permissions in your browser
- Use HTTPS in production (camera requires secure context)
- Try uploading an image instead

## Sample Images for Testing

If you don't have sugarcane images, you can:
1. Search for "sugarcane disease images" online
2. Use the **Diseases** page to see what each disease looks like
3. Start with any plant image to see how the system works

## Next Steps

- Explore the **Diseases** page to learn about each disease
- Check **History** to see your past predictions
- Change language in **Settings** (English, Tamil, Telugu, Hindi)
- Toggle dark mode in **Settings**

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the research paper for technical details
- Open an issue on GitHub for bugs or feature requests

---

Happy detecting!
