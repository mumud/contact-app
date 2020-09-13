import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ContactList from '../../components/ContactList';
import { alertActions } from '../../store/actions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const Home = () => {
  const alert = useSelector((state) => state.alertReducer);
  const dispatch = useDispatch();

  return (
    <div className='app'>
      {alert.message && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          autoHideDuration={6000}
          onClose={() => dispatch(alertActions.clear())}>
          <Alert
            onClose={() => dispatch(alertActions.clear())}
            severity={alert.type}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <Container maxWidth='sm' className='app__container'>
        <div className='app__title'>MY CONTACT</div>
        <ContactList />
      </Container>
    </div>
  );
};

export default Home;
