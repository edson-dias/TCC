import json
from uuid import uuid4
from flask_restful import Resource, reqparse, abort
from weblanches.models import Promotion, Lunch, PromoLunch
from weblanches.ext.serializer import PromotionSchema
from weblanches.ext.database import db
from werkzeug.datastructures import FileStorage


parser = reqparse.RequestParser()
parser.add_argument('name')
parser.add_argument('value')
parser.add_argument('image', type=FileStorage, location='files')
parser.add_argument('lunchs')


def abort_if_promotion_exists(name):
    promotion = Promotion.query.filter_by(name=name).first()
    if promotion:
        abort(406, message=f"Promotion already exist: ID {promotion.id}")


def image_handler(img_file):
    if img_file:
        img_extension = img_file.filename.rsplit(".", 1)[1]
        random_name = uuid4().hex
        img_name = f'{random_name}.{img_extension}'
        img_file.save(f'static/image/{img_name}')
    else:
        img_name = None
    return img_name


def lunchs_handler(lunchs_json):
    lunchs = []
    lunchs_list = json.loads(lunchs_json)
    with db.session.no_autoflush:
        for lunch_infos in lunchs_list:
            lunch = Lunch.query.get_or_404(lunch_infos['lunchs']['id'], description=f"Doesn't exist data in Lunch with id {lunch_infos['lunchs']['id']}")
            promo_lunch = PromoLunch(quantity=lunch_infos['quantity'])
            promo_lunch.lunchs = lunch
            lunchs.append(promo_lunch)
    return lunchs


class PromotionsResource(Resource):
    def get(self):
        promotions = Promotion.query.all()
        return PromotionSchema(many=True).dump(promotions)

    def post(self):
        args = parser.parse_args()
        abort_if_promotion_exists(args['name'])
        
        img_name = image_handler(args['image'])
        lunchs = []
        lunchs_list = json.loads(args['lunchs'])
        with db.session.no_autoflush:
            for lunch_infos in lunchs_list:
                lunch = Lunch.query.get_or_404(lunch_infos['id'], description=f"Doesn't exist data in Lunch with id {lunch_infos['id']}")
                promo_lunch = PromoLunch(quantity=lunch_infos['quantity'])
                promo_lunch.lunchs = lunch
                lunchs.append(promo_lunch)


        new_promotion = Promotion(
            name=args['name'],
            value=args['value'],
            image=f'http://localhost:5000/static/image/{img_name}',
            lunchs=lunchs
        )
        db.session.add(new_promotion)
        db.session.commit()        
        return new_promotion.id, 201
        

class PromotionResource(Resource):
    def get(self, promotion_id):
        promotion = Promotion.query.filter_by(id=promotion_id).first()
        return PromotionSchema().dump(promotion)

    def put(self, promotion_id):
        args = parser.parse_args()
        img_name = image_handler(args['image'])
        promotion = Promotion.query.get_or_404(promotion_id, description=f"Doesn't exist data in Promotion with id {promotion_id}")
        with db.session.no_autoflush:
            promotion.name = args['name']
            promotion.value = args['value']
            promotion.image = f'http://localhost:5000/static/image/{img_name}',
            promotion.lunchs = lunchs_handler(args['lunchs'])
        db.session.add(promotion)
        db.session.commit()
        return 204

    def delete(self, promotion_id):
        promotion = Promotion.query.get_or_404(promotion_id, description=f"Doesn't exist data in Promotion with id {promotion_id}")
        db.session.delete(promotion)
        db.session.commit()
        return 406
