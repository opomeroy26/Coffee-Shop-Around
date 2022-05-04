import React from "react";
import ShopCard from "./ShopCard";

function ShopContainer ({shops, comments, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick, setShops, bookmarked, onUpdateLikes }) {
    const shop = shops.map((shop) => (
        <ShopCard 
            key = {shop.id}
            shop = {shop}
            comments = {comments}
            onBookmarkClick = {onBookmarkClick}
            onAddToComments = {onAddToComments}
            user= {user}
            onDeleteShop = {onDeleteShop}
            onDeleteComment = {onDeleteComment}
            onLikeClick = {onLikeClick}
            setShops= {setShops}
            bookmarked = {bookmarked}
            shops = {shops}
            onUpdateLikes = {onUpdateLikes}
        />
    ) )
    return(
        <div>
            {shop}
        </div>
    )
}

export default ShopContainer;