import React, {useState} from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Button, Tooltip, IconButton } from '@mui/material';
import BookmarkCard from "./BookmarkCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "react-bootstrap";

function Profile ({shops, bookmarked, user, comments, onRemoveBookmark}) {
    const [seeBookmark, setSeeBookmark] = useState(false)
    const [seeEditForm, setSeeEditForm] = useState(false)
    const [seeYourComments, setSeeYourComments] = useState(false)

  const commentor = user.comments;
  const commentors = commentor.map((comment) => comment.comment)
  


    const bookmarks = bookmarked.map((bookmark) => (
        <BookmarkCard 
            key = {bookmark.id}
            bookmark = {bookmark}
            user = {user}
            onRemoveBookmark = {onRemoveBookmark}
        
        />
    ))



    // function handleSeeForm(){
    //     setSeeEditForm(true)
    //     setSeeBookmark(false)
    //     setSeeYourComments(false)
    // }

    // function handleSeeYourComments(){
    //     setSeeEditForm(false)
    //     setSeeYourComments(true)
    //     setSeeBookmark(false)
    // }

    function handleSeeBookmark(){
        setSeeBookmark(true)
        setSeeEditForm(false)
        setSeeYourComments(false)
    }

    if (seeBookmark === true){
        return(
        <div className="profile">
        <Container>
        <Col>
        <img id = "profile_image" alt={user.username} src={user.profile_img}/>
        <h5 id="profile_name" >{user.username}</h5>
        <p id="profile_age">{user.location}</p>
        <Tooltip title="Edit">
        <IconButton>
        </IconButton>
        </Tooltip>
        </Col>
        </Container>
        <Button onClick={()=> setSeeBookmark(false)}> Bookmarked Items</Button>
        {/* <Button onClick={()=> handleSeeYourComments()}>See Comments</Button> */}
        {/* <Button onClick={()=> handleSeeForm()}>Edit Profile</Button> */}
        

    <div id ="bookmark">
        <Container>
        <Row id="bookmark">
        {bookmarks}
        </Row>
        </Container>
    </div>
    </div>
    )
} else if (seeEditForm === true) {
    return (
        <div className="profile">
        <Container>
        <Col>
        <img id = "profile_image" alt={user.username} src={user.profile_img}/>
        <h5 id="profile_name" >{user.username}</h5>
        <p id="profile_age">{user.location}</p>
        <Tooltip title="Edit">
        <IconButton>
        </IconButton>
        </Tooltip>
        </Col>
        </Container>
        <Button onClick={()=>handleSeeBookmark()}>Bookmarked Items</Button>
        {/* <Button onClick={()=> handleSeeYourComments()}>See Comments</Button> */}
        {/* <Button onClick={()=> setSeeEditForm(false)}>Edit Profile</Button> */}

        <div id ="bookmark">
        <Container>
        <Col id="bookmark">
        Form
        </Col>
        </Container>
    </div>
    </div>

    )
} else if (seeYourComments === true){
    return ( 
    <div className="profile">
    <Container>
    <Col>
    <img id = "profile_image" alt={user.username} src={user.profile_img}/>
    <h5 id="profile_name" >{user.username}</h5>
    <p id="profile_age">{user.location}</p>
    <Tooltip title="Edit">
    <IconButton>
    </IconButton>
    </Tooltip>
    </Col>
    </Container>
    <Button onClick={()=> setSeeBookmark(true)}>Bookmarked Items</Button>
    {/* <Button onClick={()=> setSeeYourComments(false)}>See Comments</Button> */}
    {/* <Button onClick={()=> handleSeeForm()}>Edit Profile</Button> */}

    <div id ="bookmark">
    <Container>
    <Col id="bookmark">
   <Card>
       <Card.Text>{commentors}</Card.Text>
   </Card>
   Your Comments
    </Col>
    </Container>
</div>
</div>)
} else {
    return (
        <div className="prof">
        <Container>
        <img id = "prof_image" alt={user.username} src={user.profile_img}/>
        <h5 id="profile_name" >{user.username}</h5>
        <p id="prof_age">{user.location}</p>
        <Tooltip title="Edit">
        <IconButton>
        </IconButton>
        </Tooltip>
        </Container>
        <Button onClick={()=> setSeeBookmark(true)}> Bookmarked Items</Button> 
        {/* <Button onClick={()=> setSeeYourComments(true)}>See Comments</Button> */}
        {/* <Button onClick={()=> setSeeEditForm(true)}>Edit Profile</Button> */}
        </div>
    )
}

}

export default Profile;