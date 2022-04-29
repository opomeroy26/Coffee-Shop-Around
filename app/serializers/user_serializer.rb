class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :profile_img, :location, :admin
end
