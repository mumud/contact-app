import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Skeleton from '@material-ui/lab/Skeleton';

const ContactCard = ({ data, onClick, confirmDelete, loading }) => {
  return (
    <ListItem
      className='contact__item'
      alignItems='flex-start'
      button
      onClick={() => onClick(data.id)}>
      <ListItemAvatar>
        {loading ? (
          <Skeleton animation='wave' variant='circle' width={40} height={40} />
        ) : (
          <Avatar
            alt={data.firstName + ' ' + data.lastName}
            src={data.photo}></Avatar>
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          loading ? (
            <Skeleton
              animation='wave'
              height={10}
              width='80%'
              style={{ marginBottom: 6 }}
            />
          ) : (
            data.firstName + ' ' + data.lastName
          )
        }
        secondary={
          loading ? (
            <Skeleton animation='wave' height={10} width='40%' />
          ) : (
            `Age : ${data.age}`
          )
        }
      />
      <ListItemSecondaryAction>
        {loading ? null : (
          <IconButton
            edge='end'
            aria-label='delete'
            color='secondary'
            onClick={() => confirmDelete(data.id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ContactCard;
