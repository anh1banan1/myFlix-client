import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieView extends React.Component {
    constructor() {
        super();
    
        this.state = {};
      }
    // keypressCallback(event) {
    //     console.log(event.key);
    // }

    // componentDidMount() {
    //     document.addEventListener('keypress', this.keypressCallback);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('keypress', this.keypressCallback);
    // }

    render() {
        const { movie, onBackClick } = this.props;

    return (
        <div className='movie-view'>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <span className='label text-danger'>Description: </span>
              <span className='value'>{movie.description}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Genre: </span>
              <span className='value'>{movie.genre.name}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Director: </span>
              <span className='value'>{movie.director.name}</span>
            </Card.Text>
            <Button onClick={() => onClick()} variant='primary'>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name:PropTypes.string.isRequired,
      Description:PropTypes.string.isRequired,
    }),
    Director:PropTypes.shape({
      Name:PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
  }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};