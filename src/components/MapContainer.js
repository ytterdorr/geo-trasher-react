import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { locations: [] };
  }

  componentDidMount() {
    // let items = JSON.parse(sessionStorage.items);
    let items = this.props.sessionStorageItems;
    console.log("items:", items);
    let locations = items.list.map((item) => {
      let locItem = {
        name: item[0],
        position: {
          lat: item[1],
          lng: item[2],
        },
      };
      console.log("item in map", locItem);
      return locItem;
    });

    console.log("locations", locations);
    this.setState({ locations: locations });
    console.log(this.state);
  }

  render() {
    return (
      <Map
        containerStyle={{
          maxWidth: "100vw",
          width: "400px",
          maxHeight: "300px",
        }}
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 58.4283254,
          lng: 15.574016,
        }}
      >
        {this.state.locations.map((item, i) => (
          <Marker
            key={item.name + i}
            title={item.name}
            name={item.name}
            position={item.position}
            // icon={{
            //   url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            // }}
          />
        ))}
        {/* <Marker
          title={"The marker`s title will appear as a tooltip."}
          name={"SOMA"}
          position={{ lat: 58.4283254, lng: 15.574016 }}
        /> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGtFwEHjqnregA-SThEQLOuiHfw-_7Ot8",
})(MapContainer);

// export default GoogleApiWrapper({
//   style: { width: "300px" },
//   apiKey: "AIzaSyDGtFwEHjqnregA-SThEQLOuiHfw-_7Ot8",
// })(MapContainer);

// import React, { useState } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapContainer = (props) => {
//   let items = JSON.parse(sessionStorage.items);
//   const mapStyles = {
//     height: "100%",
//     width: "100%",
//   };

//   const defaultCenter = {
//     lat: items.list[0][1],
//     lng: items.list[0][2],
//   };

//   const locations = items.list.map((item) => {
//     // console.log(item);
//     let locItem = {
//       name: item[0],
//       location: {
//         lat: 58.4283254,
//         lng: 15.574016,
//       },
//     };
//     console.log(locItem);
//     return locItem;
//   });

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDGtFwEHjqnregA-SThEQLOuiHfw-_7Ot8">
//       <GoogleMap
//         mapContainerStyle={mapStyles}
//         zoom={13}
//         center={defaultCenter}
//       />
//       <Marker
//         position={{
//           lat: 58.4284,
//           lng: 15.574016,
//         }}
//       />
//     </LoadScript>
//   );
// };

// export default MapContainer;
