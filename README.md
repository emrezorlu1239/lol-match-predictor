# LoL Match Predictor

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=fff)
![LightGBM](https://img.shields.io/badge/LightGBM-107C10?style=for-the-badge&logo=lightgbm&logoColor=fff)
![Flask](https://img.shields.io/badge/Flask-000?style=for-the-badge&logo=flask&logoColor=fff)

A cinematic League of Legends match predictor with a sleek React frontend and a Python ML backend powered by LightGBM. Get real-time win probability predictions based on champion drafts and game stats.

## Screenshot

![App Screenshot](./screenshot.png)

## Features

- **18 input features** — champion picks, ranks, summoner spells, and more
- **90.05% accuracy** on held-out test data
- **95.73% ROC-AUC** score
- **Real-time predictions** via Flask REST API
- **Cinematic animations** — particle effects, glassmorphism, and smooth transitions
- **Responsive design** — works on desktop and mobile
- **Champion icons** — auto-loaded from Data Dragon CDN
- **Interactive UI** — hover effects, glow animations, and loading states

## How to Run

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The API will start on `http://localhost:5000`.

### Frontend

```bash
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Vite, Framer Motion, Tailwind CSS |
| Backend | Python, Flask |
| ML | LightGBM, scikit-learn, pandas |
| Data | League of Legends match history dataset |

## License

MIT
