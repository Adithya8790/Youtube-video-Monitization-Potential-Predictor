import numpy as np
import pandas as pd


# 🔹 Monetization Logic
def get_monetization_label(engagement):

    if engagement < 0.02:
        return "Low"
    elif engagement < 0.05:
        return "Medium"
    else:
        return "High"


# 🔹 Main Prediction Function
def predict(data, likes_model, engagement_model, feature_columns):

    # Convert input to DataFrame
    df = pd.DataFrame([data])

    # -----------------------------
    # 🔧 BASIC FEATURE ENGINEERING
    # -----------------------------

    # Dummy values (we will improve later)
    df["title_sentiment"] = 0
    df["clickbait_score"] = 1
    df["seo_score"] = 50
    df["day_of_week"] = 2

    # Advanced features
    df["subscriber_per_video"] = 1000
    df["log_video_length"] = np.log1p(df["video_length"])

    # -----------------------------
    # 🔁 MATCH TRAINING FEATURES
    # -----------------------------

    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[feature_columns]

    # -----------------------------
    # 🤖 MODEL PREDICTION
    # -----------------------------

    # Likes (log → original)
    log_likes = likes_model.predict(df)
    likes = np.expm1(log_likes)

    # Engagement
    engagement = engagement_model.predict(df)[0]

    # Monetization
    monetization = get_monetization_label(engagement)

    # -----------------------------
    # 📤 OUTPUT
    # -----------------------------

    return {
        "predicted_likes": float(likes[0]),
        "engagement_rate": float(engagement),
        "monetization": monetization
    }