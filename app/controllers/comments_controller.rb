class CommentsController < ApplicationController
    # before_action :authorize
    skip_before_action :authorize


    def index 
        comments = Comment.all 
        render json: comments 
    end

    def create 
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end

    private 

    def authorize 
        return render json: {error: "Not authorized"}, status: :unauthorized
    end

    def comment_params 
        params.permit(:user_id, :shop_id, :comment, :postdate, :likes, :created_at)
    end
end
