from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import anthropic
import base64
import os
from dotenv import load_dotenv
import json
from typing import Dict, Any

load_dotenv()

app = FastAPI(title="Sugarcane Disease Detection API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Comprehensive disease database (reference only, not limiting detection)
DISEASE_DATABASE = {
    # Fungal Diseases
    "Red Rot": {
        "category": "Fungal",
        "scientific_name": "Colletotrichum falcatum",
        "symptoms": ["Reddish lesions on internodes", "Discolored stem", "Blackened buds", "White patches inside stem"],
        "treatment": "Remove and burn infected canes. Apply Carbendazim or Propiconazole fungicide. Use disease-free seed material.",
        "prevention": "Plant resistant varieties like Co 419, Co 997. Use hot water treatment for seed canes. Ensure proper field sanitation.",
        "severity": "High",
        "affected_parts": ["Stem", "Internodes"]
    },
    "Smut": {
        "category": "Fungal",
        "scientific_name": "Sporisorium scitamineum",
        "symptoms": ["Dark whip-like structures", "Blackened buds", "Fungal growth from shoot tip", "Greyish spore mass"],
        "treatment": "Remove infected tillers immediately and burn. Avoid ratooning from infected fields. Apply systemic fungicides.",
        "prevention": "Use disease-free seed. Treat seed with hot water (52°C for 30 min). Plant resistant varieties like Co 86032.",
        "severity": "High",
        "affected_parts": ["Shoot", "Tillers"]
    },
    "Rust": {
        "category": "Fungal",
        "scientific_name": "Puccinia melanocephala",
        "symptoms": ["Small circular pustules", "Orange to brown spots", "Powdery appearance on leaves", "Yellow halos around spots"],
        "treatment": "Apply sulfur-based or copper-based fungicides. Remove heavily infected leaves. Improve air circulation.",
        "prevention": "Plant resistant varieties. Ensure proper field drainage. Monitor regularly during humid conditions. Balanced fertilization.",
        "severity": "Medium",
        "affected_parts": ["Leaves"]
    },
    "Leaf Scald": {
        "category": "Bacterial",
        "scientific_name": "Xanthomonas albilineans",
        "symptoms": ["Linear white streaks parallel to veins", "Pencil line streaks", "Leaf wilting", "Top leaves turning white"],
        "treatment": "Use disease-free seed canes. Apply copper-based bactericides. Remove and destroy infected plants.",
        "prevention": "Hot water treatment of seed (50°C for 2 hours). Disinfect cutting tools with 5% sodium hypochlorite. Plant resistant varieties.",
        "severity": "High",
        "affected_parts": ["Leaves", "Vascular system"]
    },
    "Mosaic Virus": {
        "category": "Viral",
        "scientific_name": "Sugarcane Mosaic Virus (SCMV)",
        "symptoms": ["Irregular chlorotic patterns", "Mosaic mottling", "Yellow streaks", "Stunted growth", "Leaf distortion"],
        "treatment": "No direct cure. Control aphid vectors with systemic insecticides (Imidacloprid). Remove infected plants.",
        "prevention": "Use virus-free planting material. Control aphids through regular monitoring. Plant resistant varieties. Rogue out infected plants.",
        "severity": "High",
        "affected_parts": ["Leaves", "Entire plant"]
    },
    "Pokkah Boeng": {
        "category": "Fungal",
        "scientific_name": "Fusarium moniliforme",
        "symptoms": ["Top leaves twisted and wrinkled", "Chlorotic streaks", "Malformed spindle", "Knife cuts on leaves"],
        "treatment": "Apply systemic fungicides like Carbendazim. Remove affected tops. Improve field drainage.",
        "prevention": "Avoid excessive nitrogen. Ensure proper drainage. Plant resistant varieties. Balance soil nutrients.",
        "severity": "Medium",
        "affected_parts": ["Top leaves", "Spindle"]
    },
    "Wilt Disease": {
        "category": "Fungal",
        "scientific_name": "Fusarium sacchari / Cephalosporium sacchari",
        "symptoms": ["Yellowing and drying of leaves", "Internal discoloration of vascular bundles", "Wilting", "Stunted growth"],
        "treatment": "No effective chemical control. Remove and burn infected plants. Avoid ratoon crops from infected fields.",
        "prevention": "Use resistant varieties. Practice crop rotation. Ensure good drainage. Use certified healthy seed canes.",
        "severity": "High",
        "affected_parts": ["Vascular system", "Entire plant"]
    },
    "Ring Spot": {
        "category": "Fungal",
        "scientific_name": "Leptosphaeria sacchari",
        "symptoms": ["Circular spots with reddish margins", "Yellow halos", "Concentric rings", "Leaf necrosis"],
        "treatment": "Apply Mancozeb or copper-based fungicides. Remove infected leaves.",
        "prevention": "Maintain field hygiene. Ensure balanced nutrition. Plant tolerant varieties.",
        "severity": "Low",
        "affected_parts": ["Leaves"]
    },
    "Eye Spot": {
        "category": "Fungal",
        "scientific_name": "Bipolaris sacchari / Helminthosporium sacchari",
        "symptoms": ["Oval spots with yellow borders", "Eye-like appearance", "Red-brown center", "Multiple spots per leaf"],
        "treatment": "Spray Mancozeb or Carbendazim. Improve air circulation.",
        "prevention": "Remove crop residues. Avoid overhead irrigation. Plant resistant varieties.",
        "severity": "Low",
        "affected_parts": ["Leaves"]
    },
    "Brown Spot": {
        "category": "Fungal",
        "scientific_name": "Cercospora longipes",
        "symptoms": ["Brown elongated spots", "Parallel to leaf veins", "Coalescing lesions", "Premature leaf drying"],
        "treatment": "Apply copper oxychloride or Mancozeb. Remove infected leaves.",
        "prevention": "Maintain proper plant spacing. Avoid water stress. Use resistant varieties.",
        "severity": "Medium",
        "affected_parts": ["Leaves"]
    },
    "Yellow Leaf Spot": {
        "category": "Fungal",
        "scientific_name": "Mycovellosiella koepkei",
        "symptoms": ["Yellow spots on leaves", "Spots turn brown with age", "Numerous small lesions", "Leaf yellowing"],
        "treatment": "Fungicide application if severe. Usually doesn't require treatment.",
        "prevention": "Ensure adequate nutrition. Maintain field hygiene. Monitor regularly.",
        "severity": "Low",
        "affected_parts": ["Leaves"]
    },
    "Red Stripe": {
        "category": "Bacterial",
        "scientific_name": "Acidovorax avenae subsp. avenae",
        "symptoms": ["Red longitudinal stripes on leaves", "Stripes become necrotic", "Leaf tip dying", "Young leaves affected"],
        "treatment": "Apply copper-based bactericides. Remove infected leaves.",
        "prevention": "Use disease-free planting material. Disinfect tools. Plant resistant varieties.",
        "severity": "Medium",
        "affected_parts": ["Leaves"]
    },
    "Ratoon Stunting Disease": {
        "category": "Bacterial",
        "scientific_name": "Leifsonia xyli subsp. xyli",
        "symptoms": ["Stunted growth", "Thin stalks", "Internal reddish discoloration", "Reduced tillering", "Yield reduction"],
        "treatment": "No cure once infected. Use disease-free seed. Hot water treatment mandatory.",
        "prevention": "Hot water treatment of seed canes (50°C for 2 hours). Disinfect harvesting tools between plants. Use tissue culture plants.",
        "severity": "High",
        "affected_parts": ["Vascular tissue", "Entire plant"]
    },
    "Gumming Disease": {
        "category": "Bacterial",
        "scientific_name": "Xanthomonas vasicola",
        "symptoms": ["Gum exudation from nodes", "Sticky substance on stalks", "Internal discoloration", "Vascular plugging"],
        "treatment": "Remove infected canes. Apply copper-based bactericides.",
        "prevention": "Use healthy seed canes. Maintain field sanitation. Avoid wounding during cultivation.",
        "severity": "Medium",
        "affected_parts": ["Nodes", "Vascular system"]
    },
    "Yellow Leaf Virus": {
        "category": "Viral",
        "scientific_name": "Sugarcane Yellow Leaf Virus (SCYLV)",
        "symptoms": ["Yellowing of midrib on lower leaves", "Yellow discoloration progressing upward", "Premature leaf drying", "Reduced vigor"],
        "treatment": "No cure. Remove infected plants. Control aphid vectors.",
        "prevention": "Use virus-tested planting material. Control aphid populations. Plant resistant varieties. Avoid stressed conditions.",
        "severity": "High",
        "affected_parts": ["Leaves", "Vascular system"]
    },
    "Streak Mosaic Virus": {
        "category": "Viral",
        "scientific_name": "Sugarcane Streak Mosaic Virus (SCSMV)",
        "symptoms": ["Chlorotic streaks parallel to veins", "Mosaic patterns", "Leaf distortion", "Stunted growth"],
        "treatment": "No chemical cure. Remove infected plants. Control insect vectors.",
        "prevention": "Use certified virus-free seed. Control mealybugs and aphids. Rogue infected plants early.",
        "severity": "High",
        "affected_parts": ["Leaves"]
    },
    "Fiji Leaf Gall": {
        "category": "Viral",
        "scientific_name": "Fiji Disease Virus (FDV)",
        "symptoms": ["Galls on lower leaf surface", "Short internodes", "Excessive tillering", "Stunted growth", "Phyllody"],
        "treatment": "No cure. Destroy infected plants. Control planthopper vectors.",
        "prevention": "Vector control with insecticides. Use resistant varieties. Remove volunteer canes. Quarantine measures.",
        "severity": "Very High",
        "affected_parts": ["Leaves", "Stalks", "Entire plant"]
    },
    "Sour Rot": {
        "category": "Fungal",
        "scientific_name": "Geotrichum candidum",
        "symptoms": ["Sour smell from stalks", "Soft rot", "Pinkish discoloration internally", "Liquefaction of tissues"],
        "treatment": "Usually occurs post-harvest. Prevent by reducing harvest injuries. Cool storage helps.",
        "prevention": "Minimize mechanical damage during harvest. Process cane quickly. Maintain proper storage conditions.",
        "severity": "Medium",
        "affected_parts": ["Internodes", "Entire stalk"]
    },
    "Healthy": {
        "category": "None",
        "symptoms": ["Uniform green color", "No lesions or spots", "Normal growth", "No discoloration"],
        "treatment": "No treatment needed. Maintain good agricultural practices.",
        "prevention": "Continue regular monitoring. Maintain balanced nutrition. Ensure proper irrigation and drainage.",
        "severity": "None",
        "affected_parts": []
    }
}


@app.get("/")
def read_root():
    return {"message": "Sugarcane Disease Detection API", "status": "running"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "api_version": "1.0.0"}


@app.get("/api/diseases")
def get_diseases():
    """Return information about all diseases in the database"""
    return {"diseases": DISEASE_DATABASE, "total_diseases": len(DISEASE_DATABASE)}


@app.post("/api/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict disease from uploaded image using Claude Vision API.
    FULLY DYNAMIC - Can detect ANY sugarcane disease, not limited to predefined list.
    """
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Read and encode image
        image_data = await file.read()
        base64_image = base64.standard_b64encode(image_data).decode("utf-8")

        # Determine media type
        media_type = file.content_type or "image/jpeg"

        # Get API key
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise HTTPException(status_code=500, detail="API key not configured")

        # Initialize Claude client
        client = anthropic.Anthropic(api_key=api_key)

        # Improved prompt - removed bias and made more objective
        prompt = """You are an expert plant pathologist specializing in sugarcane diseases. Carefully analyze this image and provide an accurate diagnosis.

ANALYSIS APPROACH:
1. Examine visible symptoms: discoloration, lesions, spots, wilting, deformities, growth patterns
2. Identify affected plant parts: leaves, stem, internodes, shoots, roots
3. Determine disease severity based on symptom extent and damage
4. Match observed symptoms to known sugarcane diseases

COMMON SUGARCANE DISEASES:
Fungal: Red Rot (Colletotrichum falcatum), Smut (Sporisorium scitamineum), Rust (Puccinia melanocephala), Wilt (Fusarium sacchari), Pokkah Boeng (Fusarium moniliforme), Ring Spot, Eye Spot, Brown Spot, Yellow Leaf Spot, Sour Rot
Bacterial: Leaf Scald (Xanthomonas albilineans), Ratoon Stunting Disease (Leifsonia xyli), Gumming Disease, Red Stripe
Viral: Mosaic Virus (SCMV), Yellow Leaf Virus (SCYLV), Streak Mosaic, Fiji Leaf Gall
Other: Pest damage, Nutritional deficiency, Environmental stress, Healthy

RESPONSE FORMAT (JSON only, no markdown):
{
    "disease": "Disease name matching the most prominent symptoms",
    "confidence": 85,
    "category": "Fungal/Bacterial/Viral/Pest/Nutritional/Environmental/None",
    "severity": "Very High/High/Medium/Low/None",
    "symptoms": ["specific observable symptom 1", "specific observable symptom 2", "specific observable symptom 3"],
    "affected_parts": ["specific plant part 1", "specific plant part 2"],
    "treatment": "Targeted treatment based on disease identified",
    "prevention": "Specific prevention measures for this disease",
    "scientific_name": "Scientific name if known"
}

IMPORTANT: Base diagnosis ONLY on clearly visible symptoms in the image. Be objective and precise."""

        # Send request to Claude
        # Use Claude 3 Opus which should be available for all API keys
        model_name = "claude-3-opus-20240229"

        message = client.messages.create(
            model=model_name,
            max_tokens=1024,
            temperature=0.0,  # Set to 0 for maximum consistency/determinism
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": media_type,
                                "data": base64_image,
                            },
                        },
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ],
                }
            ],
        )

        # Parse response
        response_text = message.content[0].text.strip()

        # Try to extract JSON if wrapped in markdown
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0].strip()
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0].strip()

        # Parse JSON
        try:
            prediction = json.loads(response_text)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response text: {response_text}")
            raise HTTPException(status_code=500, detail=f"Failed to parse AI response: {str(e)}")

        # Check if disease exists in our database and enrich with additional info
        disease_name = prediction.get("disease", "Unknown")
        if disease_name in DISEASE_DATABASE:
            db_info = DISEASE_DATABASE[disease_name]
            # Optionally merge database info (but keep Claude's analysis primary)
            prediction["database_info"] = {
                "in_database": True,
                "category": db_info.get("category"),
                "scientific_name": db_info.get("scientific_name")
            }
        else:
            # New/unknown disease detected
            prediction["database_info"] = {
                "in_database": False,
                "note": "Disease identified but not in reference database"
            }

        # Remove AI branding from response
        # Keep metadata internal but don't expose to frontend

        return {
            "success": True,
            "prediction": prediction,
            "timestamp": None  # Will be set by frontend
        }

    except anthropic.APIError as e:
        raise HTTPException(status_code=500, detail=f"Claude API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("API_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
