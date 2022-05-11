class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :shop

  # scope :recent, -> { where('created_at >= :twelve_hours_ago', twelve_hours_ago: Time.now - 12.hours) }
end

