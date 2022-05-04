class BookmarkSerializer < ActiveModel::Serializer
  attributes :id, :bookmarked, :shop
  has_one :shop
  has_one :user
  # has_many :shops
  # has_many :comments, through: :shop
  # has_many :comments, through: :shop
end
