from flask_restful import Resource, reqparse, abort
from weblanches.models import Ingredient, Lunch
from weblanches.ext.serializer import LunchSchema
from weblanches.ext.database import db


parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('value')
parser.add_argument('veggie', type=bool)
parser.add_argument('image')
parser.add_argument('ingredients', type=list, location='json')

def abort_if_lunch_exists(name):
    lunch = Lunch.query.filter_by(name=name).first()
    if lunch:
        abort(406, message=f"Lunch already exist: ID {lunch[0].id}")


def get_ingredients_from_list(ingredients_list):
    ingredients = [
        Ingredient.query.get_or_404(ingredient_id, description="Ingredient not found") 
        for ingredient_id in ingredients_list
    ]    
    return ingredients


class LunchsResource(Resource):
    def get(self):
        lunchs = Lunch.query.all()
        return LunchSchema(many=True).dump(lunchs)

    def post(self):
        args = parser.parse_args()
        abort_if_lunch_exists(args['name'])
        ingredients = get_ingredients_from_list(args['ingredients'])
        new_lunch = Lunch(
            name=args['name'],
            value=args['value'],
            veggie=args['veggie'],
            image=args['image'],
            ingredients=ingredients
        )
        db.session.add(new_lunch)
        db.session.commit()
        return new_lunch.id, 201


class LunchResource(Resource):
    def get(self, lunch_id):
        lunch = Lunch.query.get_or_404(lunch_id, description=f"Doesn't exist data in Lunch with id {lunch_id}")
        return LunchSchema().dump(lunch)

    def put(self, lunch_id):
        args = parser.parse_args()
        lunch = Lunch.query.get_or_404(lunch_id, description=f"Doesn't exist data in Lunch with id {lunch_id}")
        lunch.name = args['name']
        lunch.value = args['value']
        lunch.veggie = args['veggie']
        lunch.image = args['image']
        lunch.ingredients = get_ingredients_from_list(args['ingredients'])
        db.session.add(lunch)
        db.session.commit()
        return 204

    def delete(self, lunch_id):
        lunch = Lunch.query.get_or_404(lunch_id, description=f"Doesn't exist data in Lunch with id {lunch_id}")
        db.session.delete(lunch)
        db.session.commit()
        return 406
