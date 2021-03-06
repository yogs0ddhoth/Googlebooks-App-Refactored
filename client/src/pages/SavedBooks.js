import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // initialize REMOVE_BOOK mutation
  const [removeBook, { mutationData, mutationError }] = useMutation(REMOVE_BOOK);

  // initialize GET_ME query and save response as const 'user'
  const { loading, error, data } = useQuery(GET_ME);
  const user = data?.me || data?.user || {};

  const [userState, setUserState] = useState({...user}); // create state to hold user information

  // if userState is not initialized, render the page with data from 'user'
  const userData = userState.savedBooks ? userState : user;
 
  async function handleDeleteBook(bookId) {
    try { // remove book from database by bookId
      const response = await removeBook({ variables: { bookId: bookId } });
  
      setUserState({ ...response.data.removeBook }); // update state
      removeBookId(bookId); // update local storage
    } catch (err) {
      console.error(err);
    } // upon success, remove book's id from localStorage
    
  }
  
  if (loading) { // if data isn't here yet, say so
    return <h2>LOADING...</h2>;
  } 
  if (error) return `Error! ${error.message}`; // return errors

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length 
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
