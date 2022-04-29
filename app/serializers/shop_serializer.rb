class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :pricing, :wifi, :rating, :likes, :longitude, :latitude
  has_one :user
end
