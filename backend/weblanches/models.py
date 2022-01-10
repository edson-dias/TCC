from .ext.database import db


ingredient_lunch = db.Table('ingredient_lunch', db.Model.metadata, 
    db.Column('ingredient_id', db.ForeignKey('ingredient.id')), 
    db.Column('lunch_id', db.ForeignKey('lunch.id'))
)

class PromoLunch(db.Model):
    __tablename__ = 'promolunch'
    lunch_id = db.Column(db.ForeignKey('lunch.id'), primary_key=True)
    promotion_id = db.Column(db.ForeignKey('promotion.id'), primary_key=True)
    quantity = db.Column(db.DECIMAL(asdecimal=False))
    lunchs = db.relationship('Lunch', back_populates='promotions')
    promotions = db.relationship('Promotion', back_populates='lunchs')


class Lunch(db.Model):
    __tablename__ = 'lunch'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String)
    value = db.Column(db.Float)
    veggie = db.Column(db.Boolean)
    image = db.Column(db.String)
    ingredients = db.relationship('Ingredient', secondary=ingredient_lunch, back_populates='lunchs')
    promotions = db.relationship('PromoLunch', back_populates='lunchs', cascade='all, delete-orphan')


class Promotion(db.Model):
    __tablename__ = 'promotion'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    value = db.Column(db.Float)
    image = db.Column(db.String)
    lunchs = db.relationship('PromoLunch', back_populates='promotions', cascade='all, delete-orphan')


class Ingredient(db.Model):
    __tablename__ = 'ingredient'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    lunchs = db.relationship('Lunch', secondary=ingredient_lunch, back_populates='ingredients')