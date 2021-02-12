/*jshint esversion: 6 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// import "bootstrap/dist/css/bootstrap.min.css";
// import { Card } from "reactstrap";
import FoodtruckImg from "../assets/food-truck.png";
import directionsImg from "../assets/directions.png";
import menuImg from "../assets/menu.png";
// import { Link } from 'react-router-dom'
import { Form } from "semantic-ui-react";
import { NearMe } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const ExtendedList = (props) => {
  // console.log("Map Data:", props);
  // console.log("Map Data Adress:", props.data.AddressLink);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  let history = useHistory();

  const handleChange = (e) => {
    let value = e.target.value;
    let id = e.target.id;

    switch (id) {
      case "foodName":
        setName(value);
        break;

      case "hours":
        setHours(value);
        break;

      case "addressLink":
        setAddress(value);
        break;

      case "price":
        setPrice(value);
        break;

      case "image":
        setImage(value);
        break;

      default:
        console.log("No case exectued!");
        break;
    }
    console.log("event target.value:", value);
  };

  useEffect(() => {
    getData();
    // getAllData()
  }, []);

  let id = props.data.id;

  const getData = () => {
    fetch("http://localhost:5000/trucks/" + id).then((result) => {
      result.json().then((res) => {

        setName(res.Name);
        setHours(res.Hours);
        setAddress(res.AddressLink);
        setPrice(res.Price);
        setImage(res.ImgSrc);
        console.log("edit data:", res, res.Name);
      });
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let id = props.data.id;

    let data = {
      id: id,
      Name: name,
      Hours: hours,
      AddressLink: address,
      Price: price,
      ImgSrc: image,
    };
    fetch(`http://localhost:5000/trucks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Edit Data:", res);
      history.push("/");
    });
    console.log("data:", data);
  };

  const handleDelete = (id) => {
    // alert(id)
    fetch(`http://localhost:5000/trucks/${id}`, {
      method: "DELETE",
    }).then((res) => {
      console.log("Delete Data:", res);
      getData();
    });
  };

 
  // const handleUpdate = (id) => {
  //   alert(id);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCclose = () => {
    setOpen(false);
  };

  let firstStringChar = props.data.Name.charAt(0);
  return (
    <React.Fragment>
      <div>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {firstStringChar}
              </Avatar>
            }
            action={
              <IconButton onClick={handleClick} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={props.data.Name}
            subheader={props.data.Hours}
          />
          <CardMedia
            className={classes.media}
            image={props.data.ImgSrc}
            title="Paella dish"
          />
          {/* <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella isguests.
            </Typography>
          </CardContent> */}
          <CardActions disableSpacing>
            <IconButton
              href={props.data.AddressLink}
              aria-label="add to favorites"
            >
              <LocationOnIcon />
            </IconButton>
            {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
            {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
          </CardActions>
        </Card>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickOpen}>Edit</MenuItem>
          <MenuItem onClick={() => handleDelete(props.data.id)}>
            Delete
          </MenuItem>
        </Menu>

        <Dialog
          open={open}
          onClose={handleCclose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are want to edit this food info?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>

            {/* <div className="form__container">
      <div className="form__wrapper"> */}
            <Form>
              <Form.Field>
                <label>Food Name</label>
                <input
                  placeholder="Food Name"
                  id="foodName"
                  onChange={(e) => handleChange(e)}
                  value={name}
                />
              </Form.Field>
              <Form.Field>
                <label>Hours</label>
                <input
                  placeholder="Last Name"
                  id="hours"
                  onChange={(e) => handleChange(e)}
                  value={hours}
                />
              </Form.Field>
              <Form.Field>
                <label>Address Link</label>
                <input
                  placeholder="Address Link"
                  id="addressLink"
                  onChange={(e) => handleChange(e)}
                  value={address}
                />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <input
                  placeholder="Price"
                  id="price"
                  onChange={(e) => handleChange(e)}
                  value={price}
                />
              </Form.Field>
              <Form.Field>
                <label>Image Link</label>
                <input
                  placeholder="Image Link"
                  id="image"
                  onChange={(e) => handleChange(e)}
                  value={image}
                />
              </Form.Field>
              {/* <Button type="submit" onClick={saveFoodData}>
          Submit
        </Button> */}
            </Form>
            {/* </div>
    </div> */}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
            <Button onClick={(e) => handleUpdate(e)} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* <Card className="foodtruckcard">
        <img className="dimg" alt="foodtruck " src={FoodtruckImg} />
        <h2>{props.data.Name}</h2>
        <div className="MobileFoodtruckList">
          <div className="CardDescription">
            <h3>
              <a
                href={props.data.AddressLink}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  alt="directions icon"
                  src={directionsImg}
                  height="42"
                  width="42"
                />
              </a>
            </h3>
            <h3>
              <a
                href={props.data.Menu}
                rel="noopener noreferrer"
                target="_blank"
              >
                <img alt="menu icon" src={menuImg} height="42" width="42" />
              </a>
            </h3>
            <button onClick={() => handleDelete(props.data.id)}>Delete</button>
            <button onClick={() => handleUpdate(props.data.id)}>Edit</button>
          </div>
        </div>
      </Card> */}
    </React.Fragment>
  );
};

export default ExtendedList;
