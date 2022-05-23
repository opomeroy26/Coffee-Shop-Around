class ShopSerializer < ActiveModel::Serializer
  attributes :id, :name, :pricing, :wifi, :rating, :likes, :longitude, :latitude
  # has_one :user
  has_many :comments, only: :index
  has_many :bookmarks

#   def comments
#     date_to_check = DateTime.now
#     # Shop.find_by(@comments)
#     Comment.where(shop: == Shop)
#     Comment.where(created_at: date_to_check.beginning_of_day..date_to_check.end_of_day)
# end

def comments
  date_to_check = DateTime.now
  self.object.comments.where(postdate: date_to_check.beginning_of_day..date_to_check.end_of_day)
  # self.object.comments.where(created_at: date_to_check.beginning_of_minute..date_to_check.end_of_minute)
end

end
