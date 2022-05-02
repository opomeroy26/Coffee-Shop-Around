class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :postdate, :likes, :user, :created_at
  has_one :user
  has_one :shop
end
