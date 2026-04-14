import pickle
import os

# Go to project root
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))

def load_models():

    likes_path = os.path.join(BASE_DIR, "models", "likes_model.pkl")
    engagement_path = os.path.join(BASE_DIR, "models", "engagement_model.pkl")
    features_path = os.path.join(BASE_DIR, "models", "features.pkl")

    likes_model = pickle.load(open(likes_path, "rb"))
    engagement_model = pickle.load(open(engagement_path, "rb"))
    features = pickle.load(open(features_path, "rb"))

    return likes_model, engagement_model, features