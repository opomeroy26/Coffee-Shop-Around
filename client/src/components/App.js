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
}, [])

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

function handleBookmarkClick(e){
  e.preventDefault()
  console.log("clicked")
}

function handleAddToComments(form){
  console.log(form)
  setComments([...comments, form])
}

function handleAddNewShop(shopForm){
  console.log(shopForm)
  setShops([...shops, shopForm])

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
        onAddToComments = {handleAddToComments}/>
    </Route>
    <Route exact path='/profile'>
      <Profile
        user = {user}/>
    </Route>
    <Route exact path='/bookmarked'>
      <Bookmarked
      shops = {shops}
      bookmarked = {bookmarked}/>
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
            onAddToComments = {handleAddToComments}/>
        </Route>
        <Route exact path='/profile'>
          <Profile
            user = {user}/>
        </Route>
        <Route exact path='/bookmarked'>
          <Bookmarked
          shops = {shops}
          bookmarked = {bookmarked}/>
        </Route>
      </Switch>
    </div>
  );

}

export default App;
