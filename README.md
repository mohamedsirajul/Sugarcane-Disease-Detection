# Sugarcane Disease Detection Web Application

AI-powered web application for **DYNAMIC** real-time detection and classification of **ANY** sugarcane disease using Claude Vision API.

## Overview

This application helps farmers identify sugarcane diseases by simply uploading or capturing images of affected plants. The system uses Claude's advanced vision capabilities to analyze images and provide accurate disease predictions along with treatment recommendations.

### 🎯 **FULLY DYNAMIC DETECTION**

Unlike traditional systems limited to predefined diseases, this app can detect **ANY sugarcane disease** including:

#### Fungal Diseases (18+)
- Red Rot, Smut, Rust, Wilt Disease, Pokkah Boeng
- Ring Spot, Eye Spot, Brown Spot, Yellow Leaf Spot, Sour Rot
- And many more...

#### Bacterial Diseases (4+)
- Leaf Scald, Ratoon Stunting Disease (RSD)
- Gumming Disease, Red Stripe, Bacterial Leaf Stripe
- And more...

#### Viral Diseases (4+)
- Mosaic Virus, Yellow Leaf Virus (SCYLV)
- Streak Mosaic Virus, Fiji Leaf Gall
- And more...

#### Other Issues
- Pest damage (Borer, Scale insects, White grubs)
- Nutritional deficiencies
- Environmental stress
- **Plus ANY new or emerging diseases!**

### Reference Database

The system includes a comprehensive reference database with **18+ diseases**:

1. **Red Rot** (Colletotrichum falcatum) - High severity
2. **Smut** (Sporisorium scitamineum) - High severity
3. **Rust** (Puccinia melanocephala) - Medium severity
4. **Leaf Scald** (Xanthomonas albilineans) - High severity
5. **Mosaic Virus** (SCMV) - High severity
6. **Pokkah Boeng** (Fusarium moniliforme) - Medium severity
7. **Wilt Disease** (Fusarium sacchari) - High severity
8. **Ring Spot** (Leptosphaeria sacchari) - Low severity
9. **Eye Spot** (Bipolaris sacchari) - Low severity
10. **Brown Spot** (Cercospora longipes) - Medium severity
11. **Yellow Leaf Spot** (Mycovellosiella koepkei) - Low severity
12. **Red Stripe** (Acidovorax avenae) - Medium severity
13. **Ratoon Stunting Disease** (Leifsonia xyli) - High severity
14. **Gumming Disease** (Xanthomonas vasicola) - Medium severity
15. **Yellow Leaf Virus** (SCYLV) - High severity
16. **Streak Mosaic Virus** (SCSMV) - High severity
17. **Fiji Leaf Gall** (FDV) - Very High severity
18. **Sour Rot** (Geotrichum candidum) - Medium severity
19. **Healthy** - No disease

**Note**: Claude AI can detect diseases BEYOND this list. The database is for reference only!

## Features

- ✅ **Dynamic Detection**: Not limited to predefined diseases - can identify ANY sugarcane disease
- ✅ **Instant Results**: Get predictions in seconds with confidence scores
- ✅ **Comprehensive Analysis**: Disease name, category (Fungal/Bacterial/Viral/Pest), severity, affected parts
- ✅ **Scientific Names**: Shows scientific names when known
- ✅ **Multiple Input Methods**: Upload images or use webcam
- ✅ **Multilingual**: Supports English, Tamil, Telugu, and Hindi
- ✅ **Session History**: Tracks recent predictions (localStorage)
- ✅ **Download/Share**: Export results as text or share via system share
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Mobile Responsive**: Works on all device sizes
- ✅ **Offline-Ready**: Works without internet after initial load

## Technology Stack

### Frontend
- **React 18** with Vite
- **TailwindCSS** for styling
- **React Router** for navigation
- **i18next** for internationalization
- **Lucide React** for icons

### Backend
- **FastAPI** (Python)
- **Claude 3.5 Sonnet Vision API** (Anthropic)
- **Python Multipart** for file uploads
- **Uvicorn** ASGI server

## Project Structure

```
Sugarcane Disease Detection/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ImageUploader.jsx
│   │   │   ├── CameraCapture.jsx
│   │   │   ├── ResultCard.jsx (Dynamic display)
│   │   │   └── DiseaseCard.jsx (Shows all categories)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Detection.jsx
│   │   │   ├── Diseases.jsx (18+ diseases)
│   │   │   ├── History.jsx
│   │   │   └── Settings.jsx
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── ta.json
│   │   │   ├── te.json
│   │   │   └── hi.json
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── i18n.js
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── backend/
│   ├── app.py (Dynamic detection logic)
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Add your Anthropic API key to `.env`:
```
ANTHROPIC_API_KEY=your_api_key_here
API_PORT=8000
```

6. Run the backend:
```bash
python app.py
```

Backend will run at: http://localhost:8000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

Frontend will run at: http://localhost:5173

## Usage

1. Open http://localhost:5173 in your browser
2. Navigate to **Detection** page
3. Upload an image or use camera to capture
4. Click **Analyze Image**
5. View comprehensive results with:
   - Disease name and scientific name
   - Category (Fungal/Bacterial/Viral/Pest/etc.)
   - Confidence percentage
   - Severity level
   - Affected plant parts
   - Symptoms observed
   - Treatment recommendations
   - Prevention tips
   - Badge showing if disease is in reference database or newly detected
6. Download, share, or copy results
7. Check **History** page for past predictions

## API Endpoints

### Backend API

- `GET /` - API status
- `GET /api/health` - Health check
- `GET /api/diseases` - List all 18+ diseases in reference database
- `POST /api/predict` - **Dynamic disease prediction** (not limited to database)
  - Body: multipart/form-data with `file` field
  - Returns: JSON with comprehensive disease analysis

### API Response Format

```json
{
  "success": true,
  "prediction": {
    "disease": "Disease Name",
    "confidence": 85,
    "category": "Fungal/Bacterial/Viral/Pest/Nutritional/Environmental",
    "severity": "Very High/High/Medium/Low/None",
    "symptoms": ["symptom1", "symptom2", "symptom3"],
    "affected_parts": ["leaves", "stem", "roots"],
    "treatment": "Detailed treatment advice",
    "prevention": "Prevention strategies",
    "scientific_name": "Scientific name or 'Unknown'",
    "database_info": {
      "in_database": true/false,
      "note": "Status message"
    },
    "model": "claude-3.5-sonnet",
    "api_version": "2024-01"
  },
  "timestamp": "2025-01-19T10:30:00Z"
}
```

## How Dynamic Detection Works

### Traditional Systems (Limited)
❌ Hardcoded list of 5-6 diseases
❌ Cannot detect new/emerging diseases
❌ Requires retraining for new diseases

### Our System (Dynamic)
✅ **No hardcoded limits** - Claude analyzes ANY disease
✅ Detects emerging diseases automatically
✅ Provides detailed analysis even for unknown diseases
✅ Reference database enriches known diseases
✅ Shows badge when new disease is detected

### Prompt Strategy

The system uses an intelligent prompt that:
1. Instructs Claude to identify ANY sugarcane disease
2. Provides categories to consider (Fungal, Bacterial, Viral, Pest, etc.)
3. Requests structured JSON output with all details
4. Does NOT limit to a predefined list
5. Allows Claude to use its full agricultural pathology knowledge

## Multilingual Support

The application supports 4 languages:
- **English** (en)
- **Tamil** (ta) - தமிழ்
- **Telugu** (te) - తెలుగు
- **Hindi** (hi) - हिन्दी

Change language from **Settings** page.

## Research Background

This application is based on research from:
> "AI-Powered On-Device Mobile Application for Real-Time Classification of Sugarcane Diseases Using Deep Learning"

The research achieved **96.4% accuracy** using MobileNetV2 architecture.

Our web implementation **extends beyond** the research by:
- Supporting unlimited disease detection (not just 6 classes)
- Using latest Claude 3.5 Sonnet Vision model
- Providing richer analysis (categories, scientific names, affected parts)
- Simpler deployment without model training
- Real-time updates as Claude improves

## Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist/` folder to Vercel or Netlify

### Backend (Railway/Render)

1. Push code to GitHub
2. Connect repository to Railway or Render
3. Set environment variable: `ANTHROPIC_API_KEY`
4. Deploy

Update frontend `.env` with production backend URL:
```
VITE_API_URL=https://your-backend-url.com
```

## Disease Categories

The system automatically categorizes diseases:

### 🍄 Fungal
- Red Rot, Smut, Rust, Wilt, Pokkah Boeng
- Ring Spot, Eye Spot, Brown Spot, Yellow Leaf Spot, Sour Rot

### 💧 Bacterial
- Leaf Scald, Ratoon Stunting Disease
- Gumming Disease, Red Stripe

### 🦠 Viral
- Mosaic Virus, Yellow Leaf Virus
- Streak Mosaic Virus, Fiji Leaf Gall

### 🪲 Pest Damage
- Borer damage, Scale insects, White grubs

### 🌱 Others
- Nutritional deficiencies
- Environmental stress

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
- Create an issue on GitHub
- Check the [QUICKSTART.md](QUICKSTART.md) for setup help

## Acknowledgments

- Based on research from Tamil Nadu Agricultural University
- Powered by Anthropic's Claude 3.5 Sonnet Vision API
- Built with React and FastAPI
- Comprehensive disease database compiled from agricultural research

---

## Why This App is Better

### Compared to Traditional Systems:
1. **Unlimited Detection** - Not restricted to 5-6 diseases
2. **Future-Proof** - Automatically detects new diseases as they emerge
3. **Richer Analysis** - Categories, scientific names, affected parts
4. **No Retraining** - Claude improves automatically with updates
5. **Simple Deployment** - No model training or TFLite conversion needed

### Compared to Cloud-Only Systems:
1. **Fast Response** - Direct Claude API integration
2. **Privacy-Focused** - No persistent data storage
3. **Session History** - LocalStorage for offline access
4. **Multilingual** - 4 languages supported
5. **Open Source** - Easy to customize and extend

---

**Version**: 2.0.0 (Dynamic Detection)
**Last Updated**: 2025-01-19
**Model**: Claude 3.5 Sonnet (claude-sonnet-4-5-20250929)
