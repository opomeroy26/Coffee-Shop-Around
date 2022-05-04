import '../App.css';
import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom"
import Header from './Header';
import LogIn from './LogIn';
import ShopContainer from './ShopContainer';
import Profile from './Profile';
import Bookmarked from './Bookmarked';
import AddShop from './AddShop';


function App() {
  const [user, setUser] = useState([])
  const [shops, setShops] = useState([])
  const [comments, setComments] = useState([])
  const [bookmarked, setBookmarked] = useState([])
  const [filterBy, setFilterBy] = useState("All")
  const [likes, setLikes] = useState()

  //Fetch All Shops 
 useEffect(() => {
  fetch("/shops")
  .then(resp => resp.json())
  .then(shops => setShops(shops))
},[comments, likes])
//added shops and worked, but select changed constatnly 
//took out the [] so new comments/likes would render, broke auth 

//Fetch All Comments 
useEffect(() => {
  fetch("/comments")
  .then((resp) => resp.json())
  .then((comment) => setComments(comment))
},[] )
//added comments but GET happened repetatively 

//Fetch Bookmarked
useEffect(() => {
  fetch("/bookmarks")
  .then((resp) => resp.json())
  .then((bookmarked) => setBookmarked(bookmarked))
}, [])


function handleBookmarkClick(shop){
  // e.preventDefault()
  // console.log("click bookmarked", shop.id, user.id)

  fetch('/bookmarks', {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      shop_id: shop.id,
      bookmarked: true
    })
  })
  .then((resp) => resp.json())
  .then((data) => setBookmarked([...bookmarked, data]))
  // .then((data) => setBookmarked(bookmarked.filter((data) => data !== shop)))

}

function handleRemoveBookmarkClick(bookmark){
  // console.log("removing bookmark", bookmark)
  fetch(`/bookmarks/${bookmark.id}`, {method: "DELETE"})
  const updatedBookmarks = bookmarked.filter(aBookmark => aBookmark.id !== bookmark.id)
  setBookmarked(updatedBookmarks)
}

function handleAddToComments(form){
  setComments([...comments, form])
}

function handleAddNewShop(shopForm){
  setShops([...shops, shopForm])
}

function handleDeleteShop(shop) {
  fetch(`/shops/${shop.id}`, {method: "DELETE"})
  const updatedShops = shops.filter( aShop => aShop !== shop)
  setShops(updatedShops)
}

function handleDeleteComment(comment){
  // console.log("deleting comment", comment)
  fetch(`/comments/${comment}`, {method: "DELETE"})
  const updatedComments = comments.filter( aComment => aComment.id !== comment  )
  setComments(updatedComments)
}

function handleUpdateLikes(updatedLikes) {
  const updatedShopLike = shops.map((shop) => {
    if (updatedLikes.id === shop.id){
      return updatedLikes
    } else {
      return shop
    }
  })
  setShops(updatedShopLike)
}

// console.log(filterBy)

const price = shops.sort((shop1, shop2) => {
  // console.log(shop1.likes - shop2.likes)
return(shop1.pricing.localeCompare(shop2.pricing))
})

const all = shops.sort((shop1, shop2) => {
  return(shop1.id - shop2.id)
})

// console.log(test)

const filteredShops = shops
.filter((shop) => {
  if (filterBy === "All") {
    return shop
  } else if (filterBy === "Wifi") {
    return (shop.wifi === true) 
  // } else if (filterBy === "Price"){
  //   return shop.pricing === "$"
  } else {
    return (shop.likes >= 5)
  }
})
.sort((shop1, shop2) => {
  if (filterBy === "Price") {
    return (shop1.pricing.localeCompare(shop2.pricing))
   } else if (filterBy === "Most Liked") {
     return (shop2.likes - shop1.likes)
   } else {
      return shop1
    }
  }
)


// const filteredShops = shops.sort((shop1, shop2) => {
//   if (filterBy === "All"){
//     return shop1.id - shop2.id
//   } else if (filterBy === "Price"){
//     return shop1.pricing - shop2.pricing
//   } else {
//     return shop1.id - shop2.id
//   }
// })

// function handleLikeClick(updatedlikes){
//   console.log("updating likes", updatedlikes)
//   setShops(shops)
// }

//Fetch User for Login
 useEffect(() => {
   fetch("/me").then((resp) => {
     if (resp.ok){
       resp.json().then((user) => setUser(user))
     } 
   });
 }, []);

 if (!user) return <LogIn setUser = {setUser} />

 if (user.username === "Admin")
 return (
  <div className="App">
  <Header 
    user={user} 
    setUser={setUser}
    filterBy = {filterBy}
    setFilterBy = {setFilterBy}/>
  <Switch>
    <Route exact path= "/addShop">
      <AddShop 
      user ={user}
      onAddNewShop = {handleAddNewShop}/>
    </Route>
    <Route exact path="/">
      <ShopContainer
        shops = {filteredShops}
        comments = {comments}
        onBookmarkClick = {handleBookmarkClick}
        user= {user}
        onAddToComments = {handleAddToComments}
        onDeleteShop = {handleDeleteShop}
        onDeleteComment = {handleDeleteComment}
        setShops ={setShops}
        // onLikeClick = {handleLikeClick}
        />
    </Route>
    <Route exact path='/profile'>
      <Profile
        user = {user}/>
    </Route>
    <Route exact path='/bookmarked'>
      <Bookmarked
      bookmarked={bookmarked}
      shops = {shops}
      comments = {comments}
      user = {user}
      // onRemoveBookmark = {handleRemoveBookmarkClick}
      />
    </Route>

  </Switch>
</div>
 )
  return (
    <div className="App">
      <Header 
        user={user} 
        setUser={setUser}
        filterBy = {filterBy}
        setFilterBy = {setFilterBy} />
      <Switch>
        <Route exact path="/">
          <ShopContainer
            shops = {filteredShops}
            comments = {comments}
            onBookmarkClick = {handleBookmarkClick}
            user= {user}
            onAddToComments = {handleAddToComments}
            onDeleteComment = {handleDeleteComment}
            // onLikeClick = {handleLikeClick}
            bookmarked = {bookmarked}
            setShops = {setShops}
            onUpdateLikes = {handleUpdateLikes}
            likes = {likes}
            setLikes = {setLikes}
            />
        </Route>
        <Route exact path='/profile'>
          <Profile
            user = {user}/>
        </Route>
        <Route exact path='/bookmarked'>
          <Bookmarked
          shops = {shops}
          bookmarked = {bookmarked}
          user={user}
          onRemoveBookmark = {handleRemoveBookmarkClick}/>
        </Route>
      </Switch>
    </div>
  );

}

export default App;
