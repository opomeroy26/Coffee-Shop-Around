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

  //Fetch All Shops 
 useEffect(() => {
  fetch("/shops")
  .then(resp => resp.json())
  .then(shops => setShops(shops))
},[])
//took out the [] so new comments/likes would render, broke auth 

//Fetch All Comments 
useEffect(() => {
  fetch("/comments")
  .then(resp => resp.json())
  .then(comment => setComments(comment))
}, [])

//Fetch Bookmarked
useEffect(() => {
  fetch("/bookmarks")
  .then(resp => resp.json())
  .then(bookmarked => setBookmarked(bookmarked))
}, [])

function handleBookmarkClick(shop){
  // e.preventDefault()
  console.log("click bookmarked", shop)
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
  const updatedComments = comments.filter( aComment => aComment.id !== comment.id  )
  setComments(updatedComments)
}

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
    setUser={setUser}/>
  <Switch>
    <Route exact path= "/addShop">
      <AddShop 
      user ={user}
      onAddNewShop = {handleAddNewShop}/>
    </Route>
    <Route exact path="/">
      <ShopContainer
        shops = {shops}
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
      />
    </Route>

  </Switch>
</div>
 )
  return (
    <div className="App">
      <Header 
        user={user} 
        setUser={setUser} />
      <Switch>
        <Route exact path="/">
          <ShopContainer
            shops = {shops}
            comments = {comments}
            onBookmarkClick = {handleBookmarkClick}
            user= {user}
            onAddToComments = {handleAddToComments}
            onDeleteComment = {handleDeleteComment}
            // onLikeClick = {handleLikeClick}
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
          user={user}/>
        </Route>
      </Switch>
    </div>
  );

}

export default App;
