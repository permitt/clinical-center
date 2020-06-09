import React, { Component, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const containerStyle = { 
    flexDirection: 'column',
    alignItems: 'center',
    width: '75%',
    height: '400px'
  }

export function MapContainer(props) {
  let { street , city, country } = props
  let [latitude, setLatitude] = React.useState(45.267136)
  let [longitude, setLongitude] = React.useState(19.833549)

  console.log('render')
    useEffect(()=> {
        street = street.replace(' ', '+')
        city = city.replace(' ', '+')
        country = country.replace(' ', '+')
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${street}+${city}+${country}&key=40b1918818144d5fbaf82ba3142978f3
        `)
        .then(response => response.json())
        .then(response => {
            const data = response.results.length > 0? response.results[0].geometry : {}
            setLatitude(data.lat)
            setLongitude(data.lng)

            console.log("ODGOVOR", data)
        })
        .catch(err => console.log(err))

    },[props.street,props.city,props.country])
;
    return (
      <Map
        style={containerStyle}
        google={props.google}
        zoom={18}
        center={{
         lat: latitude, 
         lng: longitude
        }}
        >
        <Marker
            title={street.replace('+',' ')}
            position={{lat: latitude, lng: longitude}}
        />      
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD1jl92THFobVeZlfNWFsVNxURGmItuHNk'
  })(MapContainer);