import React, {useState} from "react";
// import {Container} from "reactstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import ExtendedList from "./ExtendedList";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    margin: "auto",
    marginTop: 25,
    position: 'absolute',
    top: 150,
    left: 380
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const ListedTrucks = props => {
  const [ search, setSearch] = useState('')
  const classes = useStyles();


const filterNameAll = props.Data.filter((n)=>{
 return n.Name.toLowerCase().includes( search.toLowerCase() )
})
  console.log("Lest Data", props.Data)
  return (
    <Container fixed>
       <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search By Name..."
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e)=> setSearch(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
      <div className="grid__container">
        {filterNameAll.map((result, index) => (
          <ExtendedList data={result} key={index}/>
        ))}
      </div>
    </Container>
  );
};

export default ListedTrucks;
