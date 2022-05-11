class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :postdate, :likes, :user, :created_at, :shop
  has_one :user
  has_one :shop

#   def comment
#     date_to_check = DateTime.now
#     comments = Comment.where(created_at: date_to_check.beginning_of_day..date_to_check.end_of_day)
    
# end

# def comment
#   date_to_check = DateTime.now
#   Comment.all.where(created_at: date_to_check.beginning_of_day..date_to_check.end_of_day)
# end

end
