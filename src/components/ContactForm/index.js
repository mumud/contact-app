import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getDetailContact, createContact, updateContact } from '../../services';
import { alertActions } from '../../store/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const ContactForm = ({ id, open, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [submited, setSubmited] = useState(false);
  const [error, setError] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');

  const submit = () => {
    setSubmited(true);
    const payload = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      photo: photo,
    };

    if (id) {
      updateContact(id, payload)
        .then((response) => {
          setSubmited(false);
          onClose(true);
          onSubmit(true);
          dispatch(alertActions.success(response.message));
        })
        .catch((error) => {
          setSubmited(false);
          setError(error.validation.keys);
          dispatch(alertActions.error(error.message));
          dispatch(alertActions.warning(error.message));
        });
    } else {
      createContact(payload)
        .then((response) => {
          setSubmited(false);
          onClose(true);
          onSubmit(true);
          dispatch(alertActions.success(response.message));
        })
        .catch((error) => {
          setSubmited(false);
          setError(error.validation.keys);
          dispatch(alertActions.error(error.message));
          dispatch(alertActions.warning(error.message));
        });
    }
  };

  useEffect(() => {
    setLoad(true);
    if (id && open) {
      getDetailContact(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setAge(response.data.age);
          setPhoto(response.data.photo);
          setLoad(false);
        })
        .catch((error) => {
          setLoad(false);
          dispatch(alertActions.warning(error.message));
        });
    } else {
      setError([]);
      setFirstName('');
      setLastName('');
      setAge('');
      setPhoto('');
      setLoad(false);
    }
  }, [dispatch, id]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}>
      <DialogTitle>{id ? 'Edit Contact' : 'Create Contact'}</DialogTitle>
      <DialogContent className='contactForm'>
        {load ? (
          <CircularProgress />
        ) : (
          <form noValidate autoComplete='off'>
            <Grid container spacing={3} className='contactForm__container'>
              <Grid item xs={12} className='contactForm__avatarContainer'>
                <Avatar
                  alt='Remy Sharp'
                  src={photo}
                  className='contactForm__avatarImage'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={error.includes('firstName')}
                  size='small'
                  label='First Name'
                  id='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={error.includes('lastName')}
                  size='small'
                  label='Last Name'
                  id='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  error={error.includes('age')}
                  size='small'
                  label='Age'
                  id='age'
                  type='number'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  error={error.includes('photo')}
                  size='small'
                  label='Photo'
                  id='photo'
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>
      <DialogActions className='contactForm__action'>
        <Button onClick={() => onClose(false)} variant='contained'>
          Close
        </Button>
        <Button
          onClick={submit}
          variant='contained'
          className='contactForm__button'
          disabled={submited}
          color='primary'>
          {submited ? (
            <CircularProgress
              size={24}
              className='contactForm__buttonLoading'
            />
          ) : (
            'Save'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactForm;
