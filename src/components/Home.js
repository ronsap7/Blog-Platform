import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CreateBlog from './CreateBlog';


const HomePage = styled.div`
  text-align: center;
  padding: 1em;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: Tomato;
`;

const SubTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionContainer = styled.section`
  gap: 2em;
  margin-top: 2em;
  display: flex;
  flex-direction: row; // Change flex-direction to row
  max-width: 1360px; /* Adjust the value as needed */
  margin-left: auto;
  margin-right: auto;
`;

const Section = styled.div`
  background-color: #f9f9f9;
  padding: 1em;
  border-radius: 8px;
  width: 100%; // Set the width to 33%
`;

const BlogPost = styled.div`
  margin-bottom: 1em;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;
  display: block; // This is important to make the whole blog post clickable
  text-decoration: none; // To remove the default link underline
  color: inherit; // To inherit the color from the parent
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LikeButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  &:hover {
  text-decoration: underline;
  }
`;

const BlogSummary = styled.p`
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0.5em;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;



const ActionButton = styled.button`
  margin: 0.5em;
  &:first-child {
    margin-left: 0;
`;

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log('useEffect triggered');
    axios.get('http://localhost:3001/blogs')
      .then(res => {
        setBlogs(res.data);
        setError(null);
      })
      .catch(err => {
        setError('Error fetching blogs');
      });
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:3001/blogs/${id}`)
      .then(res => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      })
      .catch(err => {
        setError('Error deleting blog');
      });
  };

  const editBlog = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  const toggleLike = (id) => {
    
  };

  const goToBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <HomePage>
      <Title>Welcome to Our Blog Platform!</Title>
      <SubTitle>Discover our amazing blogs <Link to="/blogs">here</Link>!</SubTitle>
      <MainContainer>
        <CreateBlog />
        <SectionContainer>
          <Section>
            <h2>Featured Post</h2>
            {blogs.filter(blog => blog.featured).map((blog) => (
              <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <BlogPost  key={blog.id}>
                <BlogImage src={blog.imageUrl} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <ActionButton onClick={() => editBlog(blog.id)}>Edit</ActionButton>
                <ActionButton onClick={() => deleteBlog(blog.id)}>Delete</ActionButton>
                <LikeButton onClick={(e) => { e.stopPropagation(); toggleLike(blog.id); }}>
                 
                </LikeButton>
              </BlogPost>
              </Link>
            
            ))}
          </Section>
          <Section>
            <h2>Recent Posts</h2>
            {blogs.slice(1).map((blog) => (
              <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <BlogPost key={blog.id} onClick={() => goToBlog(blog.id)}>
                <BlogImage src={blog.imageUrl} alt={blog.title} />
                <h3>{blog.title}</h3>
                <BlogSummary>{blog.content}</BlogSummary>
                <LikeButton onClick={(e) => { e.stopPropagation(); toggleLike(blog.id); }}>
                  
                 
                </LikeButton>
              </BlogPost>
              </Link>
            ))}
          </Section>
        </SectionContainer>
      </MainContainer>
      {error && <p>{error}</p>}
    </HomePage>
  );
  };

export default Home;
              

