from flask_cors import CORS

cors = CORS(resources={r"/api/*": {"origins": "http://localhost:4200"}})

def init_app(app):
    cors.init_app(app)