import React from "react";
import ShopCard from "./ShopCard";
import Map, {Marker, Popup} from 'react-map-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import { Container, Row, Col } from "react-bootstrap";
import { flexbox } from "@mui/system";
import "../App.css";


const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3BvbWVyb3kyNiIsImEiOiJjbDJ0YjRvajIwMmx3M2Nud2Q3Y3JjZTI4In0.FFNyRHVkJvPgNERbB03mRw';


function ShopContainer ({shops, comments, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick, setShops, bookmarked, onUpdateLikes, likes, setLikes }) {
    const shop = shops.map((shop) => (
        <ShopCard 
            key = {shop.id}
            shop = {shop}
            comments = {comments}
            onBookmarkClick = {onBookmarkClick}
            onAddToComments = {onAddToComments}
            user= {user}
            onDeleteShop = {onDeleteShop}
            onDeleteComment = {onDeleteComment}
            onLikeClick = {onLikeClick}
            setShops= {setShops}
            bookmarked = {bookmarked}
            shops = {shops}
            onUpdateLikes = {onUpdateLikes}
            likes = {likes}
            setLikes = {setLikes}
        />
    ) )

    const lat = shops.map((shop) => shop.latitude)
    const long = shops.map((shop) => shop.longitude)
    console.log(lat)
    console.log(long)
    return(
        <div>
             <Container>
                <Row>
                    <Map
                        id = "map"
                        initialViewState={{
                        longitude: -122.4,
                        latitude: 37.8,
                        zoom: 14,
                        }}
                        // style={{width: 600, height: 400}}
                        style = {{width:1150, height: 500 }}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        {shops.map((shop) => (
                            <div key={shop.id}>
                            <Marker 
                                latitude = {shop.latitude}
                                longitude = {shop.longitude}
                                color="red"
                            />
                        </div>

                        ))}
                            
                    </Map>
                </Row>
                <Row> 
                     {shop}
                </Row>
            </Container>
        </div>
    )
}

export default ShopContainer;