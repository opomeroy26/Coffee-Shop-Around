import React, {useState} from "react";
import  Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {BsBookmark, BsFillBookmarkFill, BsHeart, BsFillPinMapFill, BsTrash, BsFillTrashFill} from "react-icons/bs";


function ShopCard ({shop, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick, setShops, bookmarked, shops, onUpdateLikes, likes, setLikes, onSeeMapClick, bookmarkBtn, onDecreaseLikes}) {
  const b = bookmarked.map((bookmark) => (bookmark.shop))
  const bb = b.map((b) => b.id)
  const comments = shop.comments

  const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const date = (`${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`);
  const [showComments, setShowComments] = useState(false)

  const comment = comments.map((com) => (
    com.user.id === user.id ?
    <ul key={com.id}>
      <div>
      <button onClick={() => onDeleteComment(com.id)} id="trashicons"><BsTrash/></button><h id="username">{com.user.username}</h> <h id="comments">{com.comment}</h> {com.postdate.toString()}
      {com.created_at.toString()}
    </div>
    </ul>
    : <ul key={com.id}>
    <h id="username">{com.user.username}</h> <h id="comments">{com.comment}</h> {com.created_at}
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
  setShowComments(true)
}

function handlecloseComments(){
  setShowComments(false)
}

const commentsShowing = showComments ? <div>
  {comment} 
  <form id='forms' onSubmit={handleCommentSubmit}>
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


if (user.admin === true)

return(
  <Card style={{ width: '22rem' }} id= "shop_card">
    <Card.Img variant="top" src={"https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg"} />
    <Card.Body>
      <Card.Title>{shop.name}</Card.Title>
      <Card.Text>
       {shop.pricing}
       <br></br>
      {shop.wifi ? "Has" : "No"} wifi
       <br></br>
       {shop.likes} people like this shop
       <br></br>
       <Button id="icons" onClick={()=> onBookmarkClick(shop)}>{bb.includes(shop.id) ? <BsFillBookmarkFill/> : <BsBookmark/>} </Button>
       <Button id ="icons" onClick={() => onSeeMapClick(shop)}><BsFillPinMapFill/></Button>
       <Button id="icons" onClick={() => onDeleteShop(shop)}><BsFillTrashFill/></Button>
      </Card.Text>
      <Button variant="secondary" id="commentsbtn" onClick={showComments ? ()=> handlecloseComments() : ()=> handleOpenComments(shop)}>{showComments ? "Close Comments" : `Open Comments(${comments.length})`}</Button>
      
      {commentsShowing}
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
       <br></br>
       {shop.likes} people like this shop
       <br></br>
       <Button id="icons" onClick={()=>likeClick(shop)}><BsHeart/></Button>
       {/* <Button id="icons" onClick={()=> onBookmarkClick(shop)}>{bb.includes(shop.id || user.id) ? <BsFillBookmarkFill/> : <BsBookmark/>} </Button> */}
       <Button id="icons" onClick={()=> onBookmarkClick(shop)}><BsBookmark/></Button>
       <Button id ="icons" onClick={() => onSeeMapClick(shop)}><BsFillPinMapFill/></Button>
      </Card.Text>
      <Button variant="secondary" id="commentsbtn" onClick={showComments ? ()=> handlecloseComments() : ()=> handleOpenComments(shop)}>{showComments ? "Close Comments" : `Open Comments(${comments.length})`}</Button>
    
      {commentsShowing}
      </Card.Body>
  
  </Card>
    )
}



export default ShopCard;