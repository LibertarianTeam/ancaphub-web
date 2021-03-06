import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { searchTermRequest as searchTerm } from '../../actions/search';
import UserCard from '../../components/users/UserCard';

import {
  Container,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Spinner,
} from '../../components/ui';

import {
  SearchSidebarContainer,
  SearchContentContainer,
  SearchContainer,
} from './styles.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchData = () => {
  const term = useQuery().get('s');
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchTerm !== '') {
      dispatch(searchTerm(term));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, searchTerm]);

  return (
    <Container style={{ marginTop: 16 }}>
      {!loading ? (
        <SearchContainer>
          <SearchSidebarContainer>
            <Card style={{ width: '100%' }}>
              <CardHeader title={<FormattedMessage id="search.filter" />} />
              <Menu>
                <MenuItem label={<FormattedMessage id="common.all" />} />
                <MenuItem label={<FormattedMessage id="common.library" />} />
                <MenuItem label={<FormattedMessage id="common.users" />} />
              </Menu>
            </Card>
          </SearchSidebarContainer>

          <SearchContentContainer>
            <h3 style={{ marginBottom: 16 }}>
              <FormattedMessage
                id="search.showingResultsFor"
                values={{ term }}
              />
            </h3>
            {results.users && results.users.length > 0 && (
              <>
                <h3 style={{ marginBottom: 8 }}>
                  <FormattedMessage id="common.users" />
                </h3>
                <div style={{ width: '100%' }}>
                  <div>
                    {results.users.map((user) => (
                      <div xs={3} key={user._id}>
                        <UserCard user={user.user} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </SearchContentContainer>
        </SearchContainer>
      ) : (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Spinner size={128} />
        </div>
      )}
    </Container>
  );
};

export default SearchData;
