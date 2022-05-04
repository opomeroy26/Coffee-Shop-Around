import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function BookmarkCard ({bookmark, user}){
    console.log(bookmark)
    console.log(user)
    // const bookmarkUser = shop.user
    // const mappBook = bookmarkUser.map((user) => (user.id))

    if (user.username === bookmark.user.username)
    return(
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653_1280.jpg" />
        <Card.Body>
          <Card.Title>{bookmark.shop.name}</Card.Title>
          <Card.Text>
           {bookmark.shop.pricing}
           <br>
           </br> Rating: {bookmark.shop.rating} / 10
           <br></br>
           Liked by: {bookmark.shop.likes} people
          </Card.Text>
          <Button variant="secondary">Open Comments</Button>
          <Button variant="primary">SEE ON MAP</Button>
      
          <form id='form' >
            <label> Comment: </label>
              <input 
                type="text" 
                name="comment"
                placeholder = 'Write a comment'
                // value={form.comment} 
                // onChange={handleChange} 
                />
              {/* <button type="submit">Post</button> */}
            <input type="submit" value="Submit" />
          </form>
          {/* <button onClick={() => onDeleteShop(shop)}>Delete Shop</button> */}
        </Card.Body>
      
      
      </Card>
    )
    // return(
    //     <div>no shops</div>
    // )
}

export default BookmarkCard;