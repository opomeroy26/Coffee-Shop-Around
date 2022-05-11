import '../App.css';
import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom"
import Header from './Header';
import LogIn from './LogIn';
import ShopContainer from './ShopContainer';
import Profile from './Profile';
import AddShop from './AddShop';


function App() {
  const [user, setUser] = useState(null)
  const [shops, setShops] = useState([])
  const [comments, setComments] = useState([])
  const [bookmarked, setBookmarked] = useState([])
  const [filterBy, setFilterBy] = useState("All")
  const [likes, setLikes] = useState()
  // const [bookmarkBtn, setBookmarkBtn] = useState(true)
  const initialViewState = {
    longitude: -122.44085830928,
    latitude: 37.75224190341068,
    zoom: 11,
    }

const [viewState, setViewState] = useState(initialViewState)

  //Fetch All Shops 
 useEffect(() => {
  fetch("/shops")
  .then(resp => {
    if(resp.ok){
      resp.json().then(shops => setShops(shops))
}
 });
},[comments, likes])


//Fetch All Comments 
useEffect(() => {
  fetch("/comments")
  .then((resp) => resp.json())
  .then((comment) => setComments(comment))
},[] )


//Fetch Bookmarked
useEffect(() => {
  fetch("/bookmarks")
  .then((resp) => resp.json())
  .then((bookmarked) => setBookmarked(bookmarked))
}, [])


function handleBookmarkClick(shop){
  // const newBookmarked = bookmarked.filter(bookmarkID => bookmarkID !== shop)
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
}


function handleRemoveBookmarkClick(bookmark){
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

function handleDecreaseLikes(updatedLikes) {
  console.log(updatedLikes)
}

function handleUpdateUser(updatedUser){
  setUser(updatedUser)
}

// Filtering Shops 
function filteredShops() {
  if (Array.isArray(shops)) 
  {
    return shops.filter((shop) => {
      if (filterBy === "All") {
        return shop
      } else if (filterBy === "Wifi") {
        return (shop.wifi === true) 
      } else {
        return shop
      }
    })
    .sort((shop1, shop2) => {
      if (filterBy === "Price") {
        return (shop1.pricing.localeCompare(shop2.pricing))
       } else if (filterBy === "Most Liked") {
         return (shop2.likes - shop1.likes)
       } else {
          return shop1.id - shop2.id
        }
      }
    )
    } else {
      return []
    }
  }

//Fetch User for Login
 useEffect(() => {
   fetch("/me").then((resp) => {
     if (resp.ok){
       resp.json().then((user) => setUser(user))
     } 
   });
 }, []);


 if (!user) return <LogIn setUser = {setUser} />

//  if (user.username === "Admin")
 if (user.admin === true)
 return (
    <div className="App">
      <Header 
        user={user} 
        setUser={setUser}
        filterBy = {filterBy}
        setFilterBy = {setFilterBy} 
        viewState = {viewState}
        setViewState = {setViewState}
        initialViewState = {initialViewState}/>
      <Switch>
      <Route exact path= "/addShop">
      <AddShop 
      user ={user}
      onAddNewShop = {handleAddNewShop}/>
    </Route>
        <Route exact path="/">
          <ShopContainer
            shops = {filteredShops()}
            comments = {comments}
            onBookmarkClick = {handleBookmarkClick}
            user= {user}
            onAddToComments = {handleAddToComments}
            onDeleteComment = {handleDeleteComment}
            onDeleteShop = {handleDeleteShop}
            // onLikeClick = {handleLikeClick}
            bookmarked = {bookmarked}
            setShops = {setShops}
            onUpdateLikes = {handleUpdateLikes}
            likes = {likes}
            setLikes = {setLikes}
            // bookmarkBtn = {bookmarkBtn}
            onDecreaseLikes = {handleDecreaseLikes}
            viewState={viewState}
            setViewState={setViewState}
            />
        </Route>
        <Route exact path='/profile'>
          <Profile
            user = {user}
            bookmarked={bookmarked}
            shops = {shops}
            comments = {comments}
            onRemoveBookmark = {handleRemoveBookmarkClick}
            onUpdateUser ={handleUpdateUser}/>
        </Route>
      </Switch>
    </div>
  );
  
  return (
    <div className="App">
      <Header 
        user={user} 
        setUser={setUser}
        filterBy = {filterBy}
        setFilterBy = {setFilterBy} 
        viewState = {viewState}
        setViewState = {setViewState}
        initialViewState = {initialViewState}/>
      <Switch>
        <Route exact path="/">
          <ShopContainer
            shops = {filteredShops()}
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
            onDecreaseLikes = {handleDecreaseLikes}
            viewState={viewState}
            setViewState={setViewState}
            />
        </Route>
        <Route exact path='/profile'>
          <Profile
            user = {user}
            bookmarked={bookmarked}
            shops = {shops}
            comments = {comments}
            onRemoveBookmark = {handleRemoveBookmarkClick}
            onUpdateUser ={handleUpdateUser}/>
        </Route>
      </Switch>
    </div>
  );

}

export default App;
