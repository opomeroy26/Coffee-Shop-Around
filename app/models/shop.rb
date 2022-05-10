class Shop < ApplicationRecord
  belongs_to :user
  has_many :comments 
  has_many :bookmarks
end
