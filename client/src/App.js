import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({ uri: '/graphql' });

const authlink= setContext((_, { headers }) => {
  console.log(httpLink);
  const token = localStorage.getItem('id_token');
  console.log('Payload:', {headers: { 
      ...headers, 
      authorization: token ? `Bearer ${token}` : '' 
    }})
  return { 
    headers: { 
      ...headers, 
      authorization: token ? `Bearer ${token}` : '' 
    } 
  };
})
const client = new ApolloClient(
  { link: authlink.concat(httpLink), cache: new InMemoryCache() }
);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
      </Router>
    </ApolloProvider>
  )
}

export default App;
