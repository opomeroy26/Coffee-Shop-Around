namespace :comments do
    desc "Delete Comments older than 12 hours"
    task delete_12_hours: :environment do
      Comment.where(['created_at < ?', Time.now - 1.day.ago]).destroy_all 
    end
  end