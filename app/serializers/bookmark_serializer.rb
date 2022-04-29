class BookmarkSerializer < ActiveModel::Serializer
  attributes :id, :bookmarked
  has_one :user
  has_one :shop
end
