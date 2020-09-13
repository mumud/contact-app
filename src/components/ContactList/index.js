import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ContactForm from '../ContactForm';
import ContactCard from '../ContactCard';
import { getContact, deleteContact } from '../../services';
import { alertActions } from '../../store/actions';

const ContactList = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contactId, setContactId] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // exclude column list from filter
  const excludeColumns = ['photo'];

  const contactForm = (id) => {
    setContactId(id);
    setOpenDialog(true);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Delete contact?',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteContact(id)
              .then((response) => {
                dispatch(alertActions.success(response.message));
                setRefresh(!refresh);
              })
              .catch((error) => {
                dispatch(alertActions.warning(error.message));
              });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    setLoading(true);
    getContact()
      .then((response) => {
        setDataList(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [refresh]);

  // filter records by search text
  const handleSearch = (value) => {
    setSearchTerm(value);
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setFilteredData(dataList);
    else {
      const filteredData = dataList.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setFilteredData(filteredData);
    }
  };

  return (
    <>
      <Paper component='div' className='navigation'>
        <InputBase
          className='navigation__input'
          placeholder='Search contact...'
          inputProps={{ 'aria-label': 'Search contact...' }}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <IconButton
          type='submit'
          className='navigation__iconButton'
          aria-label='search'>
          <SearchIcon />
        </IconButton>
        <Divider className='navigation__divider' orientation='vertical' />
      </Paper>
      <List
        className='contact'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader className='contact__title' component='div'>
            <h3>Contact List</h3>
            <Button
              className='contact__addButton'
              variant='contained'
              color='primary'
              startIcon={<AddCircleIcon />}
              onClick={() => contactForm()}>
              New
            </Button>
          </ListSubheader>
        }>
        {!loading
          ? filteredData.length > 0
            ? filteredData.map((item, i) => (
                <ContactCard
                  key={i}
                  data={item}
                  onClick={contactForm}
                  confirmDelete={confirmDelete}
                  loading={loading}
                />
              ))
            : 'Contact not found'
          : Array(8)
              .fill()
              .map((item, i) => (
                <ContactCard
                  key={i}
                  data={item}
                  onClick={contactForm}
                  confirmDelete={confirmDelete}
                  loading={loading}
                />
              ))}
      </List>
      <ContactForm
        id={contactId}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={() => setRefresh(!refresh)}
      />
    </>
  );
};

export default ContactList;
