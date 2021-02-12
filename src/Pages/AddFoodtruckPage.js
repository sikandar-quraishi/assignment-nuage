import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from 'react-router-dom'

const AddFoodtruckPage = () => {
  // const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");
  const [image, setImage] = useState("");

  let history = useHistory()

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

      case "place":
        setPlace(value);
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

  const saveFoodData = () => {
    let data = {
      // id: 152,
      Name: name,
      Hours: hours,
      AddressLink: address,
      Place: place,
      ImgSrc: image,
    };
    fetch("http://localhost:5000/trucks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Dele Data:", res);
      history.push('/')
    });
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
      <Form>
        <Form.Field>
          <label>Food Name (or) Cafe Name</label>
          <input
            placeholder="Food Name (or) Cafe Name"
            id="foodName"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>From open - To close</label>
          <input
            placeholder="10AM - 02PM"
            id="hours"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Address URL</label>
          <input
            placeholder="Address URL"
            id="addressLink"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Place</label>
          <input
            placeholder="Place"
            id="place"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Form.Field>
          <label>Image URL</label>
          <input
            placeholder="Image URL"
            id="image"
            onChange={(e) => handleChange(e)}
          />
        </Form.Field>
        <Button type="submit" onClick={saveFoodData}>
          Submit
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default AddFoodtruckPage;
