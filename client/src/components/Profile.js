import React, {useState} from "react";
import { Row, Container, Col } from "react-bootstrap";
import { Button, Tooltip, IconButton, Typography, Grid, Box, TextField} from '@mui/material';
import BookmarkCard from "./BookmarkCard";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "react-bootstrap";

function Profile ({shops, bookmarked, user, comments, onRemoveBookmark, onUpdateUser}) {
    const [seeBookmark, setSeeBookmark] = useState(false)
    const [seeEditForm, setSeeEditForm] = useState(false)
    const [seeYourComments, setSeeYourComments] = useState(false)

  const commentor = user.comments;
  const commentors = commentor.map((comment) => comment.comment)
  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState(user.password)
  const [location, setLocation] = useState(user.location)
  const [profile_img, setProfileImg] = useState(user.profile_img)
  


    const bookmarks = bookmarked.map((bookmark) => (
        <BookmarkCard 
            key = {bookmark.id}
            bookmark = {bookmark}
            user = {user}
            onRemoveBookmark = {onRemoveBookmark}
        
        />
    ))



    function handleSeeForm(){
        setSeeEditForm(true)
        setSeeBookmark(false)
        setSeeYourComments(false)
    }

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

    function handleSubmit(e){
        // e.preventDefault();
        // console.log(username, password, location, profile_img)
        fetch(`/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, location, profile_img})
        })
        .then(resp => resp.json())
        .then(updatedUser => {
            onUpdateUser(updatedUser)
        })

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
        <Button id="value" onClick={()=> setSeeBookmark(false)}> Bookmarked Items</Button>
        {/* <Button onClick={()=> handleSeeYourComments()}>See Comments</Button> */}
        <Button value="id" onClick={()=> handleSeeForm()}>Edit Profile</Button>
        

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
        <Button id="value" onClick={()=>handleSeeBookmark()}>Bookmarked Items</Button>
        {/* <Button onClick={()=> handleSeeYourComments()}>See Comments</Button> */}
        <Button id="value" onClick={()=> setSeeEditForm(false)}>Edit Profile</Button>

        <div id ="bookmark">
        <Container>
        <Col id="bookmark">
                    <div>
                <Container component="main"  id="editform">
                    <Box
                    id= "formtitle"
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Typography component="h1" variant="h5">
                        Edit Your Profile
                    </Typography>
                        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={(e)=>handleSubmit(e)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    required 
                                    fullWidth
                                    //  id = "username"
                                    id = "formbox"
                                    label = "Username"
                                    name= "username"
                                    value= {username}
                                    onChange = {(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                required 
                                fullWidth
                                //  id = "password"
                                id = "formbox"
                                label = "Password"
                                name= "password"
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value.replace(/[^A-Za-z]/g, "*"))}
                                autoComplete="password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                required 
                                fullWidth
                                // id = "age"
                                id = "formbox"
                                label = "Location"
                                name= "location"
                                value = {location}
                                onChange = {(e) => setLocation(e.target.value)}
                                autoComplete="location"
                                />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    required 
                                    fullWidth
                                    // id = "profile_picture"
                                    id = "formbox"
                                    label = "Profile Picture"
                                    name= "profile_picture"
                                    value = {profile_img}
                                    onChange = {(e) => setProfileImg(e.target.value)}
                                    autoComplete="profile_picture"

                                />
                                </Grid>
                                <Button
                                    id = "formbox"
                                    type = "submit"
                                    fullWidth
                                    variant="contained"
                                    sx={ { mt: 2, mb: 1}}>
                                    Update Profile
                                </Button>
                            </Grid>
                        </Box>
                        </Box>
                </Container>
        </div>
        <Button  id = "formbox" onClick={()=> setSeeEditForm(false)}>
          Cancel Changes
        </Button>
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
    <Button id="value" onClick={()=> setSeeBookmark(true)}>Bookmarked Items</Button>
    {/* <Button onClick={()=> setSeeYourComments(false)}>See Comments</Button> */}
    <Button id="value" onClick={()=> handleSeeForm()}>Edit Profile</Button>

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
        <Button id="value" onClick={()=> setSeeBookmark(true)}> Bookmarked Items</Button> 
        {/* <Button onClick={()=> setSeeYourComments(true)}>See Comments</Button> */}
        <Button id="value" onClick={()=> setSeeEditForm(true)}>Edit Profile</Button>
        </div>
    )
}

}

export default Profile;