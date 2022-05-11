namespace :comments do
  desc "Delete Comments older than 12 hours"
  task delete_12_hours: :environment do
    Comment.where(['created_at < ?', 12.hours.ago]).destroy_all 
  end
end
