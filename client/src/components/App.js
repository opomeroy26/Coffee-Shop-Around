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

 useEffect(() => {
   fetch("/me").then((resp) => {
     if (resp.ok){
       resp.json().then((user) => setUser(user))
     } 
   });
 }, []);

 if (!user) return <LogIn setUser = {setUser} />

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/home">
          <ShopContainer/>
        </Route>
        <Route exact path='/profile'>
          <Profile/>
        </Route>
        <Route exact path='/bookmarked'>
          <Bookmarked/>
        </Route>
        <Route exact path ='/addshop'>
          <AddShop/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
