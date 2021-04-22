import React from 'react';
// import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    
    constructor(){
        super();
        // Initial state is set to null
        this.state = {
            movies: [
                { _id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', Genre: 'Thriller',Director: 'Jonathan Demme', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg'},
                { _id: 2, Title: 'Crazy Rich Asians', Description: 'Rachel, a professor, dates a man named Nick and looks forward to meeting his family. However, she is shaken up when she learns that Nick belongs to one of the richest families in the country.', Genre: 'Romance', Director: 'Jon M. Chu', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Crazy_Rich_Asians_poster.png'},
                { _id: 3, Title: 'Joker', Description: 'Arthur Fleck, a party clown, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of crime and chaos.', Genre: 'Thriller', Director: 'Todd Phillips', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg'},
                { _id: 4, Title: 'The Great Gatsby', Description: 'Nick Carraway, a World War I veteran who moves to New York with the hope of making it big, finds himself attracted to Jay Gatsby and his flamboyant lifestyle.', Genre: 'Drama', Director: 'Baz Luhrmann', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c2/TheGreatGatsby2013Poster.jpg'},
                { _id: 5, Title: 'Knocked Up', Description: 'Alison, a TV Host, and Ben, a jobless man, end up having a one-night stand. Alison soon discovers that she is pregnant with Ben"s child and they must decide on their priorities and make a choice.', Genre: 'Comedy', Director: 'Judd Apatow', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/51/Knockedupmp.jpg'}
            ],
            selectedMovie: null,
            user: null
        };
    }

    // componentDidMount(){
    //     axios.get('https://mooflix.herokuapp.com/movies')
    //         .then(response => {
    //             this.setState({
    //                 movies: response.data
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />; 

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
                    ))
                }
            </div>
            );
    }
}