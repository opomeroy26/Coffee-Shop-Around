class ShopsController < ApplicationController
#    skip_before_action :authorize 
   skip_before_action :authorize, only: [:index, :show, :destroy, :update, :create]

    def index 
        render json: Shop.all
    end


    private 



end
