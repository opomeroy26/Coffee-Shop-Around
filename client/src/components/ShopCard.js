import React, {useState} from "react";
import  Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ShopCard ({shop, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick}) {
  // const [newComment, setNewComment] = useState("")
  const comments = shop.comments
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const [likes, setLikes] = useState()
  
  // const commentors = comments.user
  // const commentor = commentors.
  // console.log(comments)

  // function deleteComment(){
  //   onDeleteComment(comment)
  // }

  const comment = comments.map((com) => (
    com.user.id === user.id ?
    <ul>
    <li>
       {com.comment} {com.created_at} {com.user.username} <button onClick={() => onDeleteComment(com.id)}>delete</button>
    </li>
    </ul>
    : <ul>
    <li>
       {com.comment} {com.created_at} {com.user.username}
    </li>
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

  fetch('/comments', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment)
  })
  .then((resp) => resp.json())
  .then((data) => onAddToComments(data))
  .then(setForm(initialFormState))
}

function likeClick(){
  console.log("liked", shop)
  // setLikes(shop.likes += 1)
  fetch(`/shops/${shop.id}/likes`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes})
  })
  .then(resp => resp.json())
  .then((updatedlikes) => setLikes(updatedlikes))
  .then((updatedlikes) => onLikeClick(updatedlikes))
  // .then(updatedShop => onLikeClick(updatedShop))

}


if (user.username === "Admin")
return(
  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg" />
  <Card.Body>
    <Card.Title>{shop.name}</Card.Title>
    <Card.Text>
     {shop.pricing}
     <br>
     </br> Rating: {shop.rating} / 10
     <br></br>
     Liked by: {shop.likes} people
    </Card.Text>
    <Button variant="secondary">Open Comments</Button>
    <Button variant="primary">SEE ON MAP</Button>
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
  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg" />
  <Card.Body>
    <Card.Title>{shop.name}</Card.Title>
    <Card.Text>
     {shop.pricing}
     <br>
     </br> Rating: {shop.rating} / 10
     <br></br>
     Liked by: {shop.likes} people
     <button onClick={()=>likeClick(shop)}>♡</button>
    </Card.Text>
    <Button variant="secondary">Open Comments</Button>
    <Button variant="primary">SEE ON MAP</Button>
    <Button variant="primary" onClick={(e)=> onBookmarkClick(e)}>Bookmark</Button>
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
  </Card.Body>


</Card>
    )
}

export default ShopCard;