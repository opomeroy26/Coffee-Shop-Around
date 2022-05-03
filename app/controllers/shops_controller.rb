class ShopsController < ApplicationController
#    skip_before_action :authorize 
   skip_before_action :authorize, only: [:index, :show, :destroy, :update, :create]

    def index 
        render json: Shop.all
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

    private 
    
    def shop_params
        params.permit(:user_id, :name, :pricing, :wifi, :rating, :likes, :longitude, :latitude)
    end


end
