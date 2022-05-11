class ShopsController < ApplicationController
#    skip_before_action :authorize 
    # skip_before_action :authorize, only: [:index, :show, :destroy, :update, :create]
    skip_before_action :authorize, only: [:index]
# works once app is running, but when i restart server something breaks and i need to recomment it in ^
# def action 
#     date_to_check = DateTime.now
#     render json: @comments.where(created_at: date_to_check.beginning_of_day..date_to_check.end_of_day)
# end


    def index 
        render json: Shop.all
    end

    def show
        shop = Shop.find(params[:id])
        render json: shop, status: :ok
    end

    def create 
        shop = Shop.create!(shop_params)
        render json: shop, status: :created
    end

    def destroy 
        shop = Shop.find(params[:id])
        shop.destroy
        head :no_content
    end

    def update 
        shop = Shop.find_by(id: params[:id])
        shop.update!(shop_params)
        render json: shop, status: :created 
    end

    def increment_likes
        shop = Shop.find_by(id: params[:id]) 
        shop.update!(likes: shop.likes + 1)
        render json: shop, status: :created 
    end

    def decrement_likes 
        shop = Shop.find_by(id: params[:id])
        shop.update!(likes: shop.likes - 1)
        render json: shop, status: :created 
    end

    private 
    
    def shop_params
        params.permit(:user_id, :name, :pricing, :wifi, :rating, :likes, :longitude, :latitude)
    end


end
