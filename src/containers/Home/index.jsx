import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import Header from 'components/Header';

const ZOOM = 18;
const endPoint = 'https://data.sfgov.org/resource/rqzj-sfat.json';

const Home = ({ google }) => {
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [active, setActive] = React.useState({
    showingInfoWindow: false,
    activeMarker: {},
    selectedFood: '',
    selectedPlace: '',
    selectedAddress: '',
  });
  const [searchText, setSearchText] = React.useState({
    item: '',
    place: '',
  });
  const [center, setCenter] = React.useState({
    lat: 37.7579841905286,
    lng: -122.433465780407,
  });

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const hasSearchResult = (a = '', b = '') =>
    a.toLowerCase().includes(b.toLowerCase());

  React.useEffect(() => {
    fetch(endPoint)
      .then((res) => res.json())
      .then((dta) => {
        setData(dta);
      });
  }, []);

  React.useEffect(() => {
    const { place, item } = searchText;
    const filteredItems = data.filter(({ address, applicant, fooditems }) => {
      return (
        (hasSearchResult(address, place) ||
          hasSearchResult(applicant, place)) &&
        hasSearchResult(fooditems, item)
      );
    });
    setFilteredData(filteredItems);
    if (!!filteredItems.length) {
      const [firstItem] = filteredItems;
      setCenter({
        lat: firstItem.latitude,
        lng: firstItem.longitude,
      });
    }
  }, [data, searchText]);

  const onMarkerClick = (prop, marker, _e) => {
    const a = data.find((deta) => +deta.latitude === +prop.position.lat);
    setActive({
      selectedPlace: a.applicant,
      selectedAddress: a.address,
      selectedFood: a.fooditems,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  const displayMarkers = () => {
    return (filteredData || []).map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={onMarkerClick}
        />
      );
    });
  };

  return (
    <>
      <Header
        handleChange={(name, value) =>
          setSearchText({
            ...searchText,
            [name]: value,
          })
        }
      />
      <div style={{ marginTop: '64px' }} />
      <Map google={google} zoom={ZOOM} style={mapStyles} center={center}>
        {displayMarkers()}
        <InfoWindow
          marker={active.activeMarker}
          visible={active.showingInfoWindow}
        >
          <div>
            <h1>{active.selectedPlace}</h1>
            <p>{active.selectedAddress}</p>
            <p>{active.selectedFood}</p>
          </div>
        </InfoWindow>
      </Map>
    </>
  );
};

Home.propTypes = {
  google: PropTypes.object.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAgHkVdmrk8vZ0SmKdKANLb_mMvpqtL7fg',
})(Home);
