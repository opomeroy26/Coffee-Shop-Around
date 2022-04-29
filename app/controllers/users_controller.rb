class UsersController < ApplicationController
    # skip_before_action :authroize, only [:create]
    skip_before_action :authorize 

    def index 
        render json: User.all 
    end

    def show
        user = User.find_by(id: session[:user_id])
        render json: user, status: :ok
        # render json: @current_user
    end

    def create 
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end


    private 

    def user_params 
        params.permit(:username, :password, :profile_img, :location, :admin)
    end

end
