class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :postdate, :likes
  has_one :user
  has_one :shop
end
