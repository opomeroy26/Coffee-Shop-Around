import React, {useState} from "react";
import  Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import images from "../Images";
import {BsBookmark, BsFillBookmarkFill, BsHeart, BsFillPinMapFill, BsTrash} from "react-icons/bs";
// import Map, {Marker, Popup} from 'react-map-gl'; 
// import 'mapbox-gl/dist/mapbox-gl.css';

// const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3BvbWVyb3kyNiIsImEiOiJjbDJ0YjRvajIwMmx3M2Nud2Q3Y3JjZTI4In0.FFNyRHVkJvPgNERbB03mRw';

function ShopCard ({shop, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick, setShops, bookmarked, shops, onUpdateLikes, likes, setLikes, onSeeMapClick, bookmarkBtn, onDecreaseLikes}) {
  const b = bookmarked.map((bookmark) => (bookmark.shop))
  const bb = b.map((b) => b.id)
  const comments = shop.comments

  const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const date = (`${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`);
  const [showComments, setShowComments] = useState(false)

  // const [bookmarkedBtn, setBookmarkedBtn] = useState(false)
  // const [likes, setLikes] = useState()
  
  // const commentors = comments.user
  // const commentor = commentors.
  // console.log(comments)

  // function deleteComment(){
  //   onDeleteComment(comment)
  // }
  const c = comments.map((com) => (
    com)
)

const stringDate = (c.toString())

const todayComment = comments.map((com) => com.postdate)
// console.log(todayComment.toString())
// console.log(date)
// console.log(todayComment.toString().getDay === date.getDay)
// const dates = whereDate('created_at', '=', date('Y-m-d'))


// console.log(c.postdate === date)
// console.log(c)

// console.log(c.created_at)
// console.log(postdate)
// console.log(date)
const day = date.getDay
// console.log(date)
// console.log(postedDate)
// console.log(date.toString() === c.toString())


// console.log(typeof created_at)

  // const com = c.where(c.created_at === date)
  // console.log(com)


  const comment = comments.map((com) => (
    com.user.id === user.id ?
    <ul key={com.id}>
    {/* <li> */}
      <div>
      <button onClick={() => onDeleteComment(com.id)} id="trashicons"><BsTrash/></button><h id="username">{com.user.username}</h> <h id="comments">{com.comment}</h> {com.postdate}
      {com.created_at.toString()}
    </div>
    {/* </li> */}
    </ul>
    : <ul key={com.id}>
    {/* <li> */}
    <h id="username">{com.user.username}</h> <h id="comments">{com.comment}</h> {com.postdate}
    {/* </li> */}
    </ul>
    ))


    const initialFormState = {
      user_id: user.id , 
      shop_id: shop.id,
      comment: "",
      likes: 0,
      postdate: date,
    }

    const [form, setForm] = useState(initialFormState)

  // function handleCommentSubmit(e){
  //   e.preventDefault()
  //   console.log(comment)
  //   setNewComment("")
  // }

  // function handleChange(e){
  //   console.log(e.target.value)
  //   setNewComment(e.target.value)
  // }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm(form => ({...form, [name]: value}))
  }

  function handleCommentSubmit(e) {
    e.preventDefault()
    const newComment = {
      user_id: user.id,
      shop_id: form.shop_id,
      comment: form.comment,
      likes: form.likes,
      postdate: form.postdate
    }

  fetch("/comments", {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
    },
    body: JSON.stringify(newComment)
  })
  .then((resp) => resp.json())
  .then((data) => onAddToComments(data))
  .then(setForm(initialFormState))
}

function handleOpenComments(){
  // console.log(showComments)
  setShowComments(true)
}

function handlecloseComments(){
  setShowComments(false)
}

const commentsShowing = showComments ? <div>
  {comment} 
  <form id='form' onSubmit={handleCommentSubmit}>
        <label> Comment: </label>
          <input 
            type="text" 
            name="comment"
            placeholder = 'Write a comment'
            value={form.comment} 
            onChange={handleChange} />
          {/* <button type="submit">Post</button> */}
        <input type="submit" value="Submit" />
      </form>
  </div>: null


function likeClick(){
  // e.stopPropogation();

  fetch(`/shops/${shop.id}/likes`, {
    method: "PATCH",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(likes)
  })
  .then(resp => resp.json())
  .then((updatedlikes) => setLikes(updatedlikes))
} 

function UnlikeClick(){
  console.log("de liking")
}

if (user.admin === true)

return(
  <Card style={{ width: '18rem' }} >
  <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg" />

  <Card.Body>
    <Card.Title>{shop.name}</Card.Title>
    <Card.Text>
     {shop.pricing}
     <br></br>
     {shop.wifi ? "Has" : "No"} wifi
     {/* </br> Rating: {shop.rating} / 10 */}
     <br></br>
     Liked by: {shop.likes} people
    </Card.Text>
    <Button variant="secondary">Open Comments</Button>
    <Button variant="primary" onClick={() => onSeeMapClick(shop)}>SEE ON MAP</Button>
    {comment} 
   

    <form id='form' onSubmit={handleCommentSubmit}>
      <label> Comment: </label>
        <input 
          type="text" 
          name="comment"
          placeholder = 'Write a comment'
          value={form.comment} 
          onChange={handleChange} />
        {/* <button type="submit">Post</button> */}
      <input type="submit" value="Submit" />
    </form>
    <button onClick={() => onDeleteShop(shop)}>Delete Shop</button>
  </Card.Body>
</Card>
)

  return(

    <Card style={{ width: '22rem' }} id= "shop_card">
    <Card.Img variant="top" src={"https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg"} />
    <Card.Body>
      <Card.Title>{shop.name}</Card.Title>
      <Card.Text>
       {shop.pricing}
       <br></br>
      {shop.wifi ? "Has" : "No"} wifi
       {/* </br> Rating: {shop.rating} / 10 */}
       <br></br>
       {shop.likes} people like this shop
       <br></br>
       <Button id="icons" onClick={()=>likeClick(shop)}><BsHeart/></Button>
       <Button id="icons" onClick={()=> onBookmarkClick(shop)}>{bb.includes(shop.id) ? <BsFillBookmarkFill/> : <BsBookmark/>} </Button>
       <Button id ="icons" onClick={() => onSeeMapClick(shop)}><BsFillPinMapFill/></Button>
      </Card.Text>
      <Button variant="secondary" id="commentsbtn" onClick={showComments ? ()=> handlecloseComments() : ()=> handleOpenComments(shop)}>{showComments ? "Close Comments" : "Open Comments"}</Button>
      {/* <Button variant="primary" onClick={() => onSeeMapClick(shop)}>SEE ON MAP</Button>
      <Button onClick={()=> onBookmarkClick(shop)}>Bookmark</Button> */}

      {/* {comment}  */}
      {commentsShowing}
      </Card.Body>
  
      {/* <form id='form' onSubmit={handleCommentSubmit}> */}
        {/* <label> Comment: </label>
          <input 
            type="text" 
            name="comment"
            placeholder = 'Write a comment'
            value={form.comment} 
            onChange={handleChange} />
          <button type="submit">Post</button>
        <input type="submit" value="Submit" /> */}
      {/* </form> */}
    {/* </Card.Body> */}
  </Card>

  //   <Card style={{ width: '25rem'}}>
  //   <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg" />
    
  //   <Card.Body>
  //     <Card.Title>{shop.name}</Card.Title>
  //     <Card.Text>
  //     {shop.pricing}
  //     <br></br>
  //     Wifi: {shop.wifi ? "Yes" : "No"}
  //       {/* Rating: {shop.rating} / 10 */}
  //     <br></br>
  //     Liked by: {shop.likes} people
  //     <Button variant="primary" onClick={()=>likeClick(shop)}>♡</Button>
  //     <button onClick={()=> console.log("clicked")}>like</button>
  //     </Card.Text>
  //     <Button variant="secondary">Open Comments</Button>
  //     <Button variant="primary" onClick={() => onSeeMapClick(shop)}>SEE ON MAP</Button>
  //     {/* <Button variant="primary" onClick={()=> onBookmarkClick(shop)}>{bookmarkObj  ? "In Bookmarks" : "Bookmark"}</Button> */}
  //     <Button onClick={()=> onBookmarkClick(shop)}>Bookmark</Button>
  //     {comment} 
  //     <form id='form' onSubmit={handleCommentSubmit}>
  //       <label> Comment: </label>
  //         <input 
  //           type="text" 
  //           name="comment"
  //           placeholder = 'Write a comment'
  //           value={form.comment} 
  //           onChange={handleChange} />
  //         {/* <button type="submit">Post</button> */}
  //       <input type="submit" value="Submit" />
  //     </form>
  //   </Card.Body>
  // </Card>
    )
}



export default ShopCard;