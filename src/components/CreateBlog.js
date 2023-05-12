import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: rows;
  justify-content: center;
  align-items: center;
  max-width: 800px; /* Adjust the maximum width as needed */
  margin: 0 auto; /* Center the form horizontally */
  height: 800px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;


const FormGroup = styled.div`
  flex-basis: 100%;
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: DodgerBlue;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: DodgerBlue;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background-color: DodgerBlue;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2979ff;
  }
`;

const CreateBlog = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');
  const [nickname, setNickname] = useState('');
  const [location, setLocation] = useState('');
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('author', author);
    formData.append('nickname', nickname);
    formData.append('location', location);

    axios
      .post('http://localhost:3001/blogs', formData)
      .then((res) => {
        console.log(res.data);
        // Handle success or redirect to another page
      })
      .catch((err) => {
        console.error(err);
        // Handle error
      });
  };

  const handleCreateBlog = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  return (
    <div>
       {!showForm ? (
        <Button onClick={handleCreateBlog}>Create Your Own Blog</Button>
      ) : (
      <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="summary">Summary:</Label>
        <Input
          type="text"
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="image">Image:</Label>
        <Input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="description">Description:</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="author">Author:</Label>
        <Input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="nickname">Nickname:</Label>
        <Input
          type="text"
          id="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </FormGroup>
  
      <FormGroup>
        <Label htmlFor="location">Location:</Label>
        <Input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </FormGroup>
  
      <Button type="submit">Create Blog</Button>
    </FormContainer>
      )}
    </div>
  );
  };

  export default CreateBlog;