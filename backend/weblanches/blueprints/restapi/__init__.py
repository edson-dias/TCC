from flask import Blueprint
from flask_restful import Api

from .resources.lunch import LunchsResource, LunchResource
from .resources.promotion import PromotionsResource, PromotionResource
from .resources.ingredient import IngredientsResource, IngredientResource


bp = Blueprint("restapi", __name__, url_prefix="/api/v1")
api = Api(bp)


def init_app(app):
    api.add_resource(LunchsResource, "/lunch")
    api.add_resource(LunchResource, "/lunch/<lunch_id>")
    api.add_resource(PromotionsResource, "/promotion")
    api.add_resource(PromotionResource, "/promotion/<promotion_id>")
    api.add_resource(IngredientsResource, "/ingredient")
    api.add_resource(IngredientResource, "/ingredient/<ingredient_id>")
    app.register_blueprint(bp)
