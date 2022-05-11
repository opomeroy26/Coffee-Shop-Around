import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function AddShop ({user, onAddNewShop}) {
const history = useHistory()

const initialShopForm = {
    user_id: user.id,
    name: '',
    pricing: '',
    wifi: '',
    rating: 0,
    likes: 0,
    longitude: '',
    latitude: '',
}

const [shopForm, setShopForm] = useState(initialShopForm)

const handleChange = (e) => {
    const {name, value} = e.target;
    setShopForm(shopForm => ({...shopForm, [name]: value}))
}

function handleShopFormSubmit(e) {
    e.preventDefault()
    const newShop = {
        user_id: user.id,
        name: shopForm.name,
        pricing: shopForm.pricing,
        wifi: shopForm.wifi,
        rating: shopForm.rating,
        likes: shopForm.likes,
        longitude: shopForm.longitude,
        latitude: shopForm.latitude
    }
    fetch("/shops", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(newShop)
    })
    .then((resp) => resp.json())
    .then((data) => onAddNewShop(data))
    .then(setShopForm(initialShopForm))
    .then(history.push("/"))

}
    return (

        <div id='newItemForm'>
                        <form id='form' className='border border-secondary rounded p-2 m-2' onSubmit = {handleShopFormSubmit} >
                            <div className='form-row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='shopname' className='label'>Shop Name</label>
                                            <input 
                                                type='text' 
                                                className='form-control' 
                                                id='name' 
                                                placeholder='Please enter your shop name'
                                                value={shopForm.name}
                                                onChange={handleChange}
                                                name='name'
                                            >
                                        </input>
                                    </div>
                                </div>
                            </div>
                            

                            <div className='row'>    
                                <div className='col-6'>
                                    <div className='form-group'>
                                        <label htmlFor='pricing' className='label'>Pricing</label>
                                        <select
                                            className='form-control'
                                            id='pricing'
                                            name='pricing'
                                            value={shopForm.pricing}
                                            onChange={handleChange}>
                                                <option value="$">$</option>
                                                <option value='$$'>$$</option>
                                                <option value='$$$'>$$$</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='wifi' className='wifi'>Wifi</label>
                                        <select
                                            className='form-control'
                                            id='wifi'
                                            name='wifi'
                                            value={shopForm.wifi}
                                            onChange={handleChange}>
                                                <option value={true}>Yes</option>
                                                <option value={false}>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='row'>
                                <div className='col 6'>
                                    <div className='form-group'>
                                        <label htmlFor='latitude' className='label'>Latitude</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='latitude'
                                            placeholder='enter the latitude of your shop'
                                            name='latitude'
                                            value={shopForm.latitude}
                                            onChange={handleChange}>
                                        </input>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='longitude' className='latitude'>Longitude</label>
                                        <input
                                            type='number'
                                            className='form-control'
                                            id='longitude'
                                            placeholder='enter the longitude of your shop'
                                            name='longitude'
                                            value={shopForm.longitude}
                                            onChange={handleChange}>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            
                            <button type='submit' className='btn btn-secondary' id='form-button'>Add Shop</button>
                        </form>
                    </div>
    )
}

export default AddShop;