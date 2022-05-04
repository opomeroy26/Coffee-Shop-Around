class ShopsController < ApplicationController
#    skip_before_action :authorize 
   skip_before_action :authorize, only: [:index, :show, :destroy, :update, :create]

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
        render json: shop
    end

    private 
    
    def shop_params
        params.permit(:user_id, :name, :pricing, :wifi, :rating, :likes, :longitude, :latitude)
    end


end
