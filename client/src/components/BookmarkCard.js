import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Map, {Marker} from 'react-map-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import { BsBookmarkDash } from "react-icons/bs";

function BookmarkCard ({bookmark, user, onRemoveBookmark}){
  const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3BvbWVyb3kyNiIsImEiOiJjbDJ0YjRvajIwMmx3M2Nud2Q3Y3JjZTI4In0.FFNyRHVkJvPgNERbB03mRw';

    if (user.username === bookmark.user.username)

    return(
        <Card style={{ width: '18rem'}} id="bookmark_card">
        <Card variant="top">
        <Map
                        initialViewState={{
                        longitude: bookmark.shop.longitude,
                        latitude: bookmark.shop.latitude,
                        zoom: 13,
                        }}
                        style = {{width: '18rem', height: 200}}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                    
                            <Marker 
                                latitude = {bookmark.shop.latitude}
                                longitude = {bookmark.shop.longitude}
                                color="red"
                            />
                            
                            
        </Map>
        </Card>

        <Card.Body>
          <Card.Title>{bookmark.shop.name}</Card.Title>
          <Card.Text>
           {bookmark.shop.pricing}
           <br></br> 
           {bookmark.shop.wifi ? "Has" : "No"} wifi
           <br></br>
           {bookmark.shop.likes} people like this shop
          </Card.Text>
          <Button variant="primary" id="icons" onClick={()=> onRemoveBookmark(bookmark)}><BsBookmarkDash/></Button>
        </Card.Body>
      </Card>
    )
}

export default BookmarkCard;