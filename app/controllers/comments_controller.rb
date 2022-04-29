class CommentsController < ApplicationController
    before_action :authorize 


    def index 
        comments = Comment.all 
        render json: comments 
    end

    private 

    def authorize 
        return render json: {error: "Not authorized"}, status: :unauthorized
    end
end
