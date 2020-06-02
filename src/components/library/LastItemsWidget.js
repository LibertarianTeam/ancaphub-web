import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import CardFooter from '../ui/CardFooter';
import CardHeader from '../ui/CardHeader';
import CardBody from '../ui/CardBody';
import defaultCover from '../../assets/default-book-cover.jpg';
import LoadContent from '../ui/LoadContent';
import { getRecentItemsRequest } from '../../actions/library';
import MiniLibraryCard from './MiniLibraryCard';

const LastItems = styled.div`
  padding:0;
  margin:0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Item = styled(Link)`
  display: flex;
  border-radius: 4px;
  background: ${(props) => props.theme.palette.paperDark};
  overflow: hidden;
  cursor: pointer;
  height: 95px;
  text-decoration:none;
  box-shadow: 0px 0px 8px rgba(0,0,0,0.08);
  
  &:hover { 
    background-color: rgba(0,0,0,0.03); 
  }
  
  margin-bottom: 10px;

  &:last-child { margin-bottom: 0 }
`;

const ItemCover = styled.div`
  width: 70px;
  height: 95px;
  overflow: hidden;
  background-image: url(${(props) => props.cover});
  background-size: cover;
  background-position: center;
`;
const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1em;
  flex: 1;

  .title {
    font-weight: bold;
    font-size: 1.1em;
    max-height:2.2em;
    margin-bottom:5px;
    color: ${(props) => props.theme.palette.text.primary};
    overflow:hidden;
  }

  .author {
    font-weight: lighter;
    font-size: 14px;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const LastItemsWidget = () => {
  const dispatch = useDispatch();
  const { recentItems: items, loading } = useSelector((state) => state.library);

  React.useEffect(() => {
    dispatch(getRecentItemsRequest());
  }, [dispatch]);

  return (
    <div style={{ width: '100%' }}>
      <Card>
        <CardHeader>
          <h3>
            <FormattedMessage
              id="common.lastItems"
            />
          </h3>
        </CardHeader>
        <CardBody>
          <LoadContent loading={loading}>
            <LastItems>
              {items && items.map((item) => (
                <MiniLibraryCard item={item} />
              ))}
            </LastItems>
          </LoadContent>
        </CardBody>
        <CardFooter link="/library" label={<FormattedMessage id="common.showMore" />} />
      </Card>
    </div>
  );
};

export default LastItemsWidget;
