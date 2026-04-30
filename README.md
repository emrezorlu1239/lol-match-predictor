# LoL Match Predictor

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python)
![LightGBM](https://img.shields.io/badge/LightGBM-90%25_Accuracy-brightgreen)
![Flask](https://img.shields.io/badge/Flask-API-black?logo=flask)

A cinematic League of Legends match outcome predictor built with
React + Flask + LightGBM. Enter match data and get an instant
win probability with stunning animations.

## Features
- 90.05% Accuracy / 95.73% ROC-AUC
- 18 engineered features from match data
- Real-time predictions with 300ms debounce
- Cinematic champion splash art backgrounds
- Framer Motion animations + canvas-confetti
- Custom gold cursor + Lenis smooth scroll

## How to Run
### Backend
```bash
cd backend
pip install -r requirements.txt
python predict.py
```

### Frontend
```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS v4, Framer Motion
- Backend: Flask, LightGBM, joblib
- Animations: tsparticles, canvas-confetti, Lenis

## License
MIT
