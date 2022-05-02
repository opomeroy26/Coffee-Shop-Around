import React, {useState} from "react";
import  Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ShopCard ({shop, onBookmarkClick, user, onAddToComments}) {
  const [newComment, setNewComment] = useState("")
  const comments = shop.comments
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  
  const commentors = comments.user
  // const commentor = commentors.
  console.log(comments)

  const comment = comments.map((com) => (
    <ul>
      <li>
        {com.comment} {com.created_at} {com.user.username}
      </li>
    </ul>))


  // console.log(commentor)

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
     <button>♡</button>
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