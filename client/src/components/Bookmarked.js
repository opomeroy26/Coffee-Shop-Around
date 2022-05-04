import React from "react";
import ShopCard from "./ShopCard";
import BookmarkCard from "./BookmarkCard";

function Bookmarked ({shops, bookmarked, user, comments}) {
    const bookmarks = bookmarked.map((bookmark) => (
        <BookmarkCard 
            key = {bookmark.id}
            bookmark = {bookmark}
            user = {user}
        
        />
    )
    
    )








    return (
        <div>
            bookmarked
           {bookmarks}
        </div>
    )

    // const shop = bookmarkShop.map((shop) => (
    //     // console.log(shop)
    //     <ShopCard 
    //     key = {shop.id}
    //     shop = {shop}
    //     comments = {comments}
    //     user = {user} 
    //     />
    // ))

//     const bookmarkShop = bookmarked.map((bookmark) =>
//     bookmark.shop)

//     const bookmarkUser = bookmarked.map((bookmark) =>
//     bookmark.user)


//     const shop = shops.map((shop) => (
//         <ShopCard 
//             key = {shop.id}
//             shop = {shop}
//             user = {user}
        
//         />
//     ))
    
//     if (bookmarkUser.name === user.name)
//  return(
//      <div>
//          bookmarked
//          {shop}
//      </div>
//  )

//  return (
//      <div> bookmarked?</div>
//  )





    // const shop = shops.map((shop) => (
    //     <ShopCard 
    //         key={shop.id}
    //         shop={shop}
    //         user={user}
        
    //     />
    // ))
    // const shopp = shop.map((shop) => shop.bookmarks)
    // console.log(shopp)
    // return(
    //     <div>
    //         bookmarked
    //         {shop}
    //     </div>
    // )
}

export default Bookmarked;