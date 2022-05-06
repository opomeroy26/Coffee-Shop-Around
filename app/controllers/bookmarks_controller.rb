class BookmarksController < ApplicationController
    # skip_before_action :authorize 
    # works once app is running, but when i restart server something breaks and i need to recomment it in ^

    def index 
        render json: Bookmark.all
    end

    def create 
        bookmark = Bookmark.create!(bookmark_params)
        render json: bookmark, status: :created
    end

    def destroy
        bookmark = Bookmark.find(params[:id])
        bookmark.destroy
        head :no_content
    end

    private 

    def bookmark_params
        params.permit(:user_id, :shop_id, :bookmarked)
    end

    # def authorize 
    #     return render json: {error: "Not authorized"}, status: :unauthorized
    # end
end
