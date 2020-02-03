import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import './App.css';
import BooksComponent from "./BooksComponent";
import LoginComponent from "./LoginComponent";

function App() {
  return (
        <Container className="p-3">
            <LoginComponent />
            <Jumbotron>
                <h1>BookSwap : swap locally your books</h1>
            </Jumbotron>
            <BooksComponent />
        </Container>
  );
}

export default App;
