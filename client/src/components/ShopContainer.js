import React from "react";
import ShopCard from "./ShopCard";

function ShopContainer ({shops, comments, onBookmarkClick, user, onAddToComments, onDeleteShop }) {
    const shop = shops.map((shop) => (
        <ShopCard 
            key = {shop.id}
            shop = {shop}
            comments = {comments}
            onBookmarkClick = {onBookmarkClick}
            onAddToComments = {onAddToComments}
            user= {user}
            onDeleteShop = {onDeleteShop}
        />
    ) )
    return(
        <div>
            {shop}
        </div>
    )
}

export default ShopContainer;