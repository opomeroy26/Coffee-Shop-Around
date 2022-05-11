class User < ApplicationRecord
    has_many :comments 
    has_many :bookmarks
    has_many :shops 

    has_secure_password

    validates :username, presence:true, uniqueness:true

    attribute :profile_img, :string, default:"https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZW1vaml8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
    attribute :location, :string, default: "San Francisco"
    attribute :admin, :boolean, default: false 
    
end
