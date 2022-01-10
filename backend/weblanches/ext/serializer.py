from flask_marshmallow import Marshmallow

ma = Marshmallow()


def init_app(app):
    ma.init_app(app)


class LunchSchema(ma.Schema):
    class Meta:
        fields = ["id", "name", "value", "veggie", "image", "ingredients"]
        ordered = True

    ingredients = ma.Nested("IngredientSchema", many=True)


class PromoLunchSchema(ma.Schema):
    class Meta:
        fields = ["lunchs", "quantity"]
        ordered = True

    lunchs = ma.Nested("LunchSchema")


class PromotionSchema(ma.Schema):
    class Meta:
        fields = ["id", "name", "value", "image", "lunchs"]
        ordered = True
    lunchs = ma.Nested("PromoLunchSchema", many=True)
    

class IngredientSchema(ma.Schema):
    class Meta:
        fields = ["id", "name"]
        ordered = True