import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DownloadIcon from 'react-ionicons/lib/IosDownload';
import Paper from '../../components/ui/Paper';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import LoadContent from '../../components/ui/LoadContent';
import Dropdown from '../../components/ui/Dropdown';

import DropdownListContainer from '../../components/ui/DropdownListContainer';
import DropdownListItem from '../../components/ui/DropdownListItem';
import defaultThumbnail from '../../assets/default-book-cover.jpg';
import Categories from '../../components/categories/ShowCategories';
// import Ratings from "../../../components/library/ratings";
// import InvitedBy from "../../../components/profile/invitedBy"
// import UnavaliableContent from "../../../components/error/unavaliableContent"
// Redux
import { getSingleItemRequest as getSingleItem } from '../../actions/library';

const Title = styled.h2`
  font-weight: bold;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 2.125rem;
  margin-bottom: 5px;
`;

const Author = styled.h3`
  font-weight: lighter;
  color: ${(props) => props.theme.palette.text.contrast};
  font-size: 1.25rem;
  margin-bottom: 34px;
`;

const BookCover = styled.img`
  width: 100%;
`;

const Banner = styled.div`
  background: url(${(props) => (props.cover ? props.cover : defaultThumbnail)})
    rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  height: 230px;

  &:after {
    height: 230px;
    width: 100%;

    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
  }
`;

function SingleBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSingleItem({ itemId: id }));
  }, [dispatch, id]);

  const { singleItem, loading } = useSelector((state) => state.library);

  return (
    <LoadContent loading={loading}>
      <Banner
        cover={
          singleItem && singleItem.cover
            ? singleItem.cover.url
            : defaultThumbnail
        }
      />
      <div style={{
        marginTop: -137, marginBottom: 16, position: 'absolute', width: 'inherit',
      }}
      >
        <Container>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '33.3333% auto',
              gap: '1.4em',
            }}
          >
            <div>
              <Paper>
                <BookCover
                  src={
                    singleItem && singleItem.cover
                      ? singleItem.cover.url
                      : defaultThumbnail
                  }
                />
                <div style={{ padding: 10 }}>
                  <Dropdown
                    toggle={(
                      <Button fullwidth componente={<a />} color="secondary">
                        <FormattedMessage id="common.download" />
                      </Button>
                    )}
                    placement="top"
                  >
                    <DropdownListContainer>
                      {singleItem.files && singleItem.files.map((file) => (
                        <DropdownListItem icon={<DownloadIcon />}>
                          <a href={file.url} target="_blanck">{file.originalname}</a>
                        </DropdownListItem>
                      ))}
                    </DropdownListContainer>
                  </Dropdown>
                </div>
              </Paper>
              {/* <InvitedBy user={user} /> */}
            </div>
            <div>

              <div style={{ marginBottom: 8 }}>
                <Categories categories={singleItem.categories} />
              </div>

              <Title>{singleItem && singleItem.title}</Title>
              <Author>{singleItem && singleItem.author}</Author>
              <div>{singleItem && singleItem.content}</div>
              <div my={2}>{/* <Ratings item={book.item} /> */}</div>
            </div>
          </div>
        </Container>
      </div>
    </LoadContent>
  );
}

export default SingleBook;
