class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :shop
  has_many :comments, through: :shop
end
