import React, { useEffect, useState } from 'react';
import { fetchUsers } from './services/api';
import {
  Container,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  CircularProgress
} from '@mui/material';
import './App.css';

//Defining State and Effects

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers(); //fetching data
      setUsers(userData);
      setFilteredUsers(userData); //update state
      setLoading(false);
    };

    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) //filtering users
      )
    );
  }, [searchTerm, users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">User List</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" component="h1" gutterBottom>
        User Directory
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? ( //loading spinner
        <CircularProgress />
      ) : (
        <List>
          {filteredUsers.map(user => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default App;
