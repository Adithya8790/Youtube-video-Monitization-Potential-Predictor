# 🚀 YouTube Video Monetization Potential Predictor

An **AI-powered YouTube analytics platform** that predicts video performance and monetization potential using **Machine Learning + FastAPI + LLM insights**.

---

## 📌 Overview

This project analyzes YouTube video metadata and predicts:

* 📈 **Expected Likes**
* 💬 **Engagement Rate**
* 💰 **Monetization Potential (Low / Medium / High)**

Additionally, it provides **AI-generated explanations and improvement suggestions** to help creators optimize their content.

---

## 🧠 Key Features

* ✅ End-to-end **ML pipeline**
* ✅ Real-time prediction via **FastAPI backend**
* ✅ Advanced **feature engineering**
* ✅ **LLM-powered insights** (human-readable suggestions)
* ✅ Clean and interactive frontend (UI)
* ✅ Production-ready architecture

---

## ⚙️ Tech Stack

### 🔹 Machine Learning

* Scikit-learn
* RandomForestRegressor (Likes Prediction)
* LinearRegression (Engagement Prediction)
* Pandas, NumPy

### 🔹 Backend

* FastAPI
* Uvicorn
* Pydantic (data validation)

### 🔹 AI Layer

* LLaMA 3 (via Ollama) *(or optional OpenAI/Gemini)*
* Prompt Engineering

### 🔹 Frontend

* HTML, CSS, JavaScript
* Chart.js
* SweetAlert2
* Luxon
* Animate on Scroll (AOS)

---

## 🧩 Project Architecture

```
youtube-ml-project/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── utils/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── src/
│   ├── data_loader.py
│   ├── data_preprocessing.py
│   ├── feature_engineering.py
│   ├── model_training.py
│
├── models/
│   ├── likes_model.pkl
│   ├── engagement_model.pkl
│   └── features.pkl
│
├── data/
│   └── youtube_trending_videos_global.csv
│
└── main.py
```

---

## 🔄 ML Pipeline

1. **Data Loading**
2. **Preprocessing**

   * Cleaning
   * Missing value handling
3. **Feature Engineering**

   * Sentiment analysis
   * Clickbait score
   * SEO score
   * Time features
   * Advanced ratios
4. **Model Training**

   * Likes → Random Forest
   * Engagement → Linear Regression
5. **Model Saving (.pkl)**
6. **Deployment via FastAPI**

---

## 📊 Features Used

* Title Sentiment
* Clickbait Score
* SEO Score
* Upload Hour
* Day of Week
* Video Length (log transformed)
* Subscriber per Video
* Category Encoding

---

## 🚀 How to Run

### 🔹 1. Clone Repository

```bash
git clone https://github.com/Adithya8790/Youtube-video-Monitization-Potential-Predictor.git
cd youtube-ml-project
```

---

### 🔹 2. Setup Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

---

### 🔹 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 🔹 4. Train Models

```bash
python main.py
```

---

### 🔹 5. Run Backend

```bash
cd backend
python -m uvicorn app.main:app --reload
```

---

### 🔹 6. Open API Docs

```
http://127.0.0.1:8000/docs
```

---

## 📥 Sample API Input

```json
{
  "title": "Amazing AI Tool You Must Try!",
  "description": "This video explains a powerful AI tool.",
  "tags": "AI, technology, tools",
  "video_length": 300,
  "category_id": 10,
  "upload_hour": 18
}
```

---

## 📤 Sample Output

```json
{
  "predicted_likes": 11620.43,
  "engagement_rate": 0.0477,
  "monetization": "Medium"
}
```

---

## 🤖 AI Layer (LLM)

The system uses an LLM to:

* Explain predictions in simple language
* Suggest improvements
* Provide actionable insights

Example:

> “This video is expected to perform moderately well. Improving emotional appeal and keyword optimization could help increase engagement.”

---

## 📈 Model Performance

### Likes Model

* MAE (log): ~0.44
* R² Score: ~0.88

### Engagement Model

* MAE: ~0.02
* R² Score: ~0.12

---

## ⚠️ Limitations

* Uses static assumptions for some features (e.g., views)
* Engagement model has lower predictive power
* YouTube algorithm is a black box

---

## 🔮 Future Improvements

* Thumbnail analysis using CNN
* Real YouTube API integration
* Better engagement model (XGBoost / Neural Networks)
* Real-time data pipeline
* Personalized recommendations

---

## 👨‍💻 Author

**Adithya Kaluvala**
GitHub: https://github.com/Adithya8790

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and share feedback!

---
