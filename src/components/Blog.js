import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogTitle = styled.h2`
  font-size: 2.5em;
  color: #333;
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

const BlogContent = styled.p`
  font-size: 1.1em;
  line-height: 1.5;
  color: #333;
`;

const BlogLocation = styled.p`
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;
`;

const BlogDescription = styled.p`
    font-size: 0.9em;
    color: #666;
    margin-top: 10px;
`;

const BlogPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/blogs/${id}`)
      .then(res => {
        setBlog(res.data);
      })
      .catch(err => {
        console.log('Error fetching blog:', err);
      });
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <BlogContainer>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogAuthor>By {blog.author} - {blog.nickname}</BlogAuthor>
      <BlogDate>{blog.date}</BlogDate>
      <BlogImage src={blog.imageUrl} alt={blog.title} />
      <BlogContent>{blog.content}</BlogContent>
      <BlogLocation>Location: {blog.location}</BlogLocation>
      <BlogDescription>{blog.description}</BlogDescription>
    </BlogContainer>
  );
};

export default BlogPage;
