import React from 'react';
import { Jumbotron } from 'reactstrap';

const MarketingStuff = () => {
  return (
    <div>
      <Jumbotron style={{ borderRadius: "25px" }}>
        <h1 className="text-center homePageHeaderText">For Book Lovers!</h1>
        <p className="lead text-center homePageText" style={{ alignContent: "center" }}>
          Here you can build your digital bookshelf, <br />
          explore new books, find your future adventures.
          <br />Made by book lovers for book lovers. Come on in!
          <br /><br />
          <i><span>(All book details are retrieved from </span>
          <a href="https://www.goodreads.com" target="_blank" rel="noopener noreferrer">goodreads.com</a>)</i>
        </p>
      </Jumbotron>
    </div>
  );
};

export default MarketingStuff;
