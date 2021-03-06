import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { FiCrosshair as LocateIcon } from 'react-icons/fi';
import styled from 'styled-components';

import { searchNearbyUserRequest } from '../../actions/search';
import { updateGeoLocationsRequest } from '../../actions/settings';
import 'rc-slider/assets/index.css';
import UserCard from '../../components/users/UserCard';
import { Container, Hero, Paper, Switcher, Spinner } from '../../components/ui';

export default () => {
  const [radius, setRadius] = useState(50);
  const [location, setLastLocation] = useState({});
  const dispatch = useDispatch();
  const geoLocation = useSelector((state) => state.auth.user.geoLocation);
  const { results, loading } = useSelector((state) => state.search);

  const handleRadius = (value) => setRadius(value);

  const handleSearch = () => {
    dispatch(searchNearbyUserRequest({ radius, lastLocation: location }));
  };

  function updateLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLastLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setLastLocation(false);
        }
      );
    }
  }

  useEffect(() => {
    if (geoLocation) {
      if (!isEmpty(location) && location !== false) {
        dispatch(searchNearbyUserRequest({ radius, lastLocation: location }));
      } else {
        updateLocation();
      }
    }
  }, [dispatch, radius, geoLocation, location]);

  const switchPreferences = (value) => {
    dispatch(updateGeoLocationsRequest(value));
  };

  const Message = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2em;
    text-align: center;

    svg {
      fill: ${(props) => props.theme.palette.text.primary};
      height: 40px;
      width: 40px;
      margin-bottom: 16px;
    }
  `;

  return (
    <Container>
      <Hero
        title={<FormattedMessage id="nearby.title" />}
        description={<FormattedMessage id="nearby.description" />}
        // prettier-ignore
        actions={(
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'block', marginRight: 8 }}>
              <FormattedMessage id="nearby.location" />
            </span>
            <Switcher value={geoLocation} onChange={switchPreferences} />
          </div>
        )}
      />

      <div style={{ marginTop: 16 }}>
        {!loading ? (
          <>
            {!geoLocation ? (
              <Paper padding>
                <Message>
                  <LocateIcon color="" />
                  <FormattedMessage id="nearby.needToEnableDescription" />
                </Message>
              </Paper>
            ) : (
              <>
                {isEmpty(location) || location === false ? (
                  <Paper padding>
                    <p>
                      <FormattedMessage id="nearby.needToEnable" />
                    </p>
                  </Paper>
                ) : (
                  <div>
                    <Paper padding>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>
                          <FormattedMessage id="nearby.radius" />
                        </span>
                        <Slider
                          style={{ width: '100%', margin: '0px 16px' }}
                          value={radius}
                          min={10}
                          max={300}
                          step={10}
                          onChange={handleRadius}
                          onAfterChange={handleSearch}
                        />
                        <span>
                          {radius}
                          Km
                        </span>
                      </div>
                    </Paper>

                    {!isEmpty(results) ? (
                      <div spacing={2} style={{ marginTop: 8 }}>
                        {Array.isArray(results) &&
                          results.map((user) => (
                            <div xs={3} key={user._id}>
                              <UserCard user={user.user} />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <Paper padding>
                        <FormattedMessage id="common.noUsersFound" />
                      </Paper>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Spinner size={128} />
          </div>
        )}
      </div>
    </Container>
  );
};
