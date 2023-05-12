import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import BlogList from './BlogList';
import CreateBlog from './CreateBlog';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/blogs/:id" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
