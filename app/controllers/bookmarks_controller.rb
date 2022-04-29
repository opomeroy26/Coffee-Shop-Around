class BookmarksController < ApplicationController
    before_action :authorize 

    def index 
        render json: Bookmark.all
    end

    private 

    def authorize 
        return render json: {error: "Not authorized"}, status: :unauthorized
    end
end
