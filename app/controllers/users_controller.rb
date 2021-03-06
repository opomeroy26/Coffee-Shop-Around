class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    # skip_before_action :authorize
    # works once app is running, but when i restart server something breaks and i need to recomment it in ^

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

    def update
        user = User.find_by(id: params[:id])
        if user 
            user.update!(user_params)
            render json: user
        else
            render json: {error: "User not found"}, status: :not_found
        end

    end


    private 

    def user_params 
        params.permit(:username, :password, :profile_img, :location, :admin)
    end

end
