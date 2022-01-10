from datetime import datetime
from flask_restful import Resource, reqparse, abort
from weblanches.models import Ingredient
from weblanches.ext.serializer import IngredientSchema
from weblanches.ext.database import db


parser = reqparse.RequestParser()
parser.add_argument('name')


def abort_if_ingredient_exists(ingredient_name):
    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()
    if ingredient:
        abort(406, message=f"Ingredient already exist: ID {ingredient.id}")


class IngredientsResource(Resource):
    def get(self):
        ingredients = Ingredient.query.all()
        return IngredientSchema(many=True).dump(ingredients)

    def post(self):
        args = parser.parse_args()
        abort_if_ingredient_exists(args['name'])
        new_ingredient = Ingredient(name=args['name'])
        db.session.add(new_ingredient)
        db.session.commit()
        return new_ingredient.id, 201


class IngredientResource(Resource):
    def get(self, ingredient_id):
        ingredient = Ingredient.query.get_or_404(
            ingredient_id, 
            description=f"Doesn't exist data in Ingredient with id {ingredient_id}"
        )
        return IngredientSchema().dump(ingredient)

    def put(self, ingredient_id):
        args = parser.parse_args()
        abort_if_ingredient_exists(args['name'])
        ingredient = Ingredient.query.get_or_404(
            ingredient_id,
            description=f"Doesn't exist data in Ingredient with id {ingredient_id}"
        )
        ingredient.name = args['name']
        db.session.add(ingredient)
        db.session.commit()
        return 204

    def delete(self, ingredient_id):
        ingredient = Ingredient.query.get_or_404(
            ingredient_id,
            description=f"Doesn't exist data in Product with id {ingredient_id}"
        )
        db.session.delete(ingredient)
        db.session.commit()
        return 406
