from flask import Flask
from app.controllers.feature_extraction_controller import feature_extraction_bp
from app.controllers.search_controller import search_bp

def create_app():
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(feature_extraction_bp, url_prefix='/extract_features')
    app.register_blueprint(search_bp, url_prefix='/search_similar_videos')

    return app

