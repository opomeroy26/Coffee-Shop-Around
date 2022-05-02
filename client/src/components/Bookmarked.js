import React from "react";
import ShopCard from "./ShopCard";

function Bookmarked ({shops, comments, bookmarked }) {
    // const shop = shops.map((shop) => (
    //     <ShopCard 
    //         key = {shop.id}
    //         shop = {shop}
    //         comments = {comments}
    //     />
    // ))

    const bookmarkedShops = bookmarked.map((bookmarkShop) => (
        // console.log(bookmarkShop.shop.name)
        // <ShopCard
        //     key={bookmarkShop.id}
        //     shop = {bookmarkShop.shop}
        
        //  />
        bookmarkShop.shop
    ))

    const shop = bookmarkedShops.map(shop => (
        <ShopCard 
        key = {shop.id}
        shop = {shop}
        />
    ))

    console.log(bookmarkedShops)

    // const bookmarkedShops = (bookmarked.bookmarked === true )
    // const mapppedShops = bookmarked.shop
    // const bookshop = mapppedShops.map((shop) => (
    //     <ShopCard 
    //             key = {shop.id}
    //             shop = {shop}
    //             comments = {comments}
    //         />))

    // const bookmarks = bookmarked.map((bookmark => bookmark.shop))
    // console.log(bookmarks)

    // console.log(bookmarked)

    // const bookmarkedShop = bookmarks.map((shop) => (
    //     <ShopCard 
    //         key= {shop.id}
    //         shop = {shop}
    //         comments = {comments } />
    // ))

    // const bookmarkedShop = bookmarks.map((shop) => shop)

    // const shopshop = bookmarkedShop.map((shop) => (

    //     <ShopCard 
    //         key = {shop.id}
    //         shop = {shop} />
    // ))

   


    return(
        <div>
            {/* {bookshop} */}
            {/* {bookmarkedShop} */}
            {/* {shopshop} */}
            {/* {bookmarkedShops} */}
            test
            {/* {shop} */}
        </div>
    )
}

export default Bookmarked;