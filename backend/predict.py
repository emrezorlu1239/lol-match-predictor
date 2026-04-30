import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

MODEL_PATH = r"C:\Users\emrez\Documents\Makine öğrenmesi ve EDA modelleri\Lol web projesi dataset\lol_win_predictor_v1.pkl"

app = Flask(__name__)
CORS(app)

# Load model with proper error handling
model = None
features = None

try:
    if not os.path.exists(MODEL_PATH):
        print("ERROR: Model file not found at: " + MODEL_PATH)
        print("Please ensure the model file exists at the specified path.")
    else:
        package = joblib.load(MODEL_PATH)
        model = package['model']
        features = package['features']
        print("SUCCESS: Model loaded successfully from " + MODEL_PATH)
        print("Model expects " + str(len(features)) + " features: " + str(features))
except Exception as e:
    print("ERROR: Failed to load model from " + MODEL_PATH)
    print("Error details: " + type(e).__name__ + ": " + str(e))
    print("The API will run with dummy predictions until the model is fixed.")
    model = None
    features = [
        "firstBlood", "firstTower", "firstInhibitor", "firstBaron", 
        "firstDragon", "firstRiftHerald",
        "t1_Fighter_count", "t1_Mage_count", "t1_Assassin_count",
        "t1_Marksman_count", "t1_Support_count", "t1_Tank_count",
        "t2_Fighter_count", "t2_Mage_count", "t2_Assassin_count",
        "t2_Marksman_count", "t2_Support_count", "t2_Tank_count"
    ]

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    
    if model is None:
        print("WARNING: Model not loaded. Returning dummy prediction.")
        return jsonify({
            "win_probability": 0.55, 
            "top_features": ["firstBlood", "firstDragon", "t1_Fighter_count"]
        })
        
    try:
        row = np.array([[data.get(f, 0) for f in features]])
        proba = model.predict_proba(row)[0]
        # proba[0] is for class 1 (Blue Win), proba[1] is for class 2 (Red Win)
        win_prob = float(proba[0])
        importances = dict(zip(features, model.feature_importances_))
        top3 = sorted(importances, key=importances.get, reverse=True)[:3]
        return jsonify({"win_probability": win_prob, "top_features": top3})
    except Exception as e:
        print("ERROR during prediction: " + type(e).__name__ + ": " + str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("LoL Predictor Backend Starting...")
    if model is not None:
        print("Model status: LOADED")
    else:
        print("Model status: NOT LOADED (using dummy)")
    print("Running on http://localhost:5000")
    print("="*50 + "\n")
    app.run(port=5000, debug=True)
