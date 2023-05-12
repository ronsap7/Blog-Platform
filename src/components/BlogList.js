import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const BlogCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const BlogTitle = styled.h2`
  color: DodgerBlue;
  margin: 0;
  padding: 15px;
`;

const BlogContent = styled.p`
  color: #333;
  padding: 0 15px 15px;
  margin: 0;
`;

const BlogAuthor = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const BlogDate = styled.p`
  font-size: 0.9em;
  color: #999;
`;

const BlogImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const BlogLocation = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;
`;

const LikeButton = styled.button`
  background-color: Transparent;
  border: none;
  color: ${props => (props.liked ? 'red' : 'grey')};
  cursor: pointer;
  padding: 10px 15px;
  transition: color 0.3s ease;
`;

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/blogs`)
      .then(res => {
        setBlogs(res.data);
        setLikes(new Array(res.data.length).fill(false));
      });
  }, []);

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = !newLikes[index];
    setLikes(newLikes);
  };

  return (
    <BlogsContainer>
      {blogs.map((blog, index) => (
        <BlogCard key={blog.id}>
          <BlogTitle><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></BlogTitle>
          <BlogContent>{blog.content}</BlogContent>
          <LikeButton liked={likes[index]} onClick={() => handleLike(index)}>
            {likes[index] ? 'Unlike' : 'Like'}
          </LikeButton>
          <BlogAuthor>By {blog.author} - {blog.nickname}</BlogAuthor>
          <BlogDate>{blog.date}</BlogDate>
          <BlogImage src={blog.imageUrl} alt={blog.title} />
          
          <BlogLocation>Location: {blog.location}</BlogLocation>
        </BlogCard>
      ))}
    </BlogsContainer>
  );
};

export default BlogList;
