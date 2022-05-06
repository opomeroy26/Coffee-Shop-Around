import React, {useState} from "react";
import ShopCard from "./ShopCard";
import Map, {Marker, Popup} from 'react-map-gl'; 
import 'mapbox-gl/dist/mapbox-gl.css';
import { Container, Row, Col } from "react-bootstrap";
import { flexbox } from "@mui/system";
import "../App.css";


 const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3BvbWVyb3kyNiIsImEiOiJjbDJ0YjRvajIwMmx3M2Nud2Q3Y3JjZTI4In0.FFNyRHVkJvPgNERbB03mRw';
// const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3BvbWVyb3kyNiIsImEiOiJjbDJ0YXU0MGQwMWNyM2NvMnprZ3htNGY3In0.kHGzJWzWycU6Ybvhzdu2zw'


function ShopContainer ({shops, comments, onBookmarkClick, user, onAddToComments, onDeleteShop, onDeleteComment, onLikeClick, setShops, bookmarked, onUpdateLikes, likes, setLikes }) {
    const [showPopup, setShowPopup] = useState({0: false,});

    const initialViewState = {
        longitude: -122.4,
        latitude: 37.8,
        zoom: 11,
        }
    
    const [viewState, setViewState] = useState(initialViewState)

    function handleSeeMapClick(shop){
        setViewState({
            longitude: shop.longitude,
            latitude: shop.latitude,
            zoom: 16
        })
    }


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
            onSeeMapClick = {handleSeeMapClick}
        />
    ) )


    return(
        <div id = "container">
             <Container id = "container">
                <Row>  
                <Col  id="shop_container">
                     {shop}
                </Col>
                    <Col id="map">        
                    <Map
                        // initialViewState={{
                        // longitude: -122.4,
                        // latitude: 37.8,
                        // zoom: 11,
                        // }}
                        // initialViewState = {{...viewState}}
                        {...viewState}
                        // style={{width: 600, height: 400}}
                        onMove={evt => setViewState(evt.viewState)}
                        // style = {{width:1150, height: 500 }}
                        style = {{width: 850, height: 800}}
                        id ="map"
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        mapboxAccessToken={MAPBOX_TOKEN}
                    >
                        {shops.map((shop, index) => (
                            <div key={shop.id}>
                            <Marker 
                                latitude = {shop.latitude}
                                longitude = {shop.longitude}
                                color="red"
                                onClick={() => setShowPopup({...showPopup, [shop.id]: true})}
                            />
                            {showPopup[shop.id] && (
                                <Popup key={index} longitude={shop.longitude} latitude={shop.latitude} closeOnClick={false} onClose={() => setShowPopup(false)}>
                                    <div>
                                        <h5>{shop.name}</h5>
                                        <p>{shop.pricing}</p>
                                        <p>{shop.wifi ? "Has" : "Doesn't have"} wifi</p>
                                    </div>
                                    
                                </Popup>) 
                            }
                        </div>

                        ))}
                            
                    </Map>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ShopContainer;