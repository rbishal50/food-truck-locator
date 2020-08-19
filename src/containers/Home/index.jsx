import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { getAllData } from './actions';
import Header from 'components/Header';
import EmptyState from 'components/EmptyState';
import Wrapper from 'components/Wrapper';
import useStyles from './style';

const ZOOM = 18;
const INITIAL_CENTER = {
  lat: 37.7579841905286,
  lng: -122.433465780407,
};

const Home = ({ google, fetchAllData, mapData }) => {
  const classes = useStyles();
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
  const [center, setCenter] = React.useState(INITIAL_CENTER);

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  const hasSearchResult = (a = '', b = '') =>
    a.toLowerCase().includes(b.toLowerCase());

  React.useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  React.useEffect(() => {
    setData(mapData.data);
  }, [mapData.data]);

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
      <Wrapper>
        <div style={{ marginTop: '64px' }} />
        {!!filteredData.length && (
          <Map google={google} zoom={ZOOM} style={mapStyles} center={center}>
            {displayMarkers()}
            <InfoWindow
              marker={active.activeMarker}
              visible={active.showingInfoWindow}
              style={{ padding: 0, background: 'red' }}
            >
              <div className={classes.text}>
                <h1>{active.selectedPlace}</h1>
                <p>{active.selectedAddress}</p>
                <p>{active.selectedFood}</p>
              </div>
            </InfoWindow>
          </Map>
        )}
        {!filteredData.length && !mapData.getAllDataLoading && <EmptyState />}
      </Wrapper>
    </>
  );
};

Home.propTypes = {
  google: PropTypes.object.isRequired,
  mapData: PropTypes.object.isRequired,
  fetchAllData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ mapData: state.HomeReducer });

const mapDispatchToProps = (dispatch) => ({
  fetchAllData: () => dispatch(getAllData()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  })(Home)
);
