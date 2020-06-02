import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// Icons
import LikeIcon from 'react-ionicons/lib/IosThumbsUp';
import CommentIcon from 'react-ionicons/lib/IosText';
import CheckIcon from 'react-ionicons/lib/IosCheckmark';
import RateIcon from 'react-ionicons/lib/IosStar';
import ShareIcon from 'react-ionicons/lib/IosRedo';
import FollowIcon from 'react-ionicons/lib/IosPersonAdd';

// Other
import UserAvatar from '../users/UserAvatar';

const icons = {
  comment_liked: () => LikeIcon,
  comment_replied: () => CommentIcon,
  item_approved: () => CheckIcon,
  item_rated: () => RateIcon,
  post_commented: () => CommentIcon,
  post_liked: () => LikeIcon,
  post_shared: () => ShareIcon,
  user_followed: () => FollowIcon,
};

const NotificationWrap = styled.li`
  padding: 8px 16px;
  display: flex;
  align-items:center;
  cursor:pointer; 
  
  &:hover {
    background: rgba(0,0,0,0.05);
  }

  img {
    height:56px;
    width:56px;
    border-radius:100%
  }

  .thumb {
    position: relative;
    height: 64px;
    width:64px;
    margin-right:16px;
  }

  .icon {
    height: 28px;
    width: 28px;
    background: ${(props) => props.theme.palette.paper};
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2);
    border-radius:100%;
    position:absolute;
    bottom: 0px;
    right: 0px;
    padding:4px;

    svg {
      fill: ${(props) => props.theme.palette.secondary};
      height: 20px;
      width: 20px;
    }
  }

  .message{
    display:block;
    font-size:1.1em;
    color: ${(props) => props.theme.palette.text.primary};
  }

  .date{
    font-size:0.9em;
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const Notification = ({ notification }) => {
  const Icon = icons[notification.type]();
  return (
    <NotificationWrap>
      <div className="thumb">
        <UserAvatar user={notification.sender} size={56} />
        <div className="icon"><Icon /></div>
      </div>
      <div>
        <span className="message">
          <FormattedMessage
            id={`components.notifications.${notification.type}`}
            values={{
              ...notification.sender,
              strong: (...chunks) => <strong>{chunks}</strong>,
            }}
          />
        </span>
        <span className="date">{notification.date}</span>
      </div>
    </NotificationWrap>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf([
      'comment_liked',
      'comment_replied',
      'item_approved',
      'item_rated',
      'post_commented',
      'post_liked',
      'post_shared',
      'user_followed',
    ]),
    data: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default Notification;
