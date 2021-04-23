import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
    
    constructor(){
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            newRegistration: null
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://mooflix.herokuapp.com/movies', {
            headers: { Authorization: 'Bearer ${token}'}
        })
        .then(response => {
            // Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    // setSelectedMovie(movie) {
    //     this.setState({
    //         selectedMovie: movie
    //     });
    // }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onRegister(newRegistration) {
        this.setState({
            newRegistration
        });
    }

    render() {
        const { movies, user, newRegistration } = this.state;

        // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        </Row>

        if (!newRegistration) return <RegistrationView onRegister={(newRegistration) => this.onRegister(newRegistration)} />;

        // Before the movies have been loaded
        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                         return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/register" render={() => {
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path="/movies/:movieId" render={({ match }) => {
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                         </Col>
                    }} />

                 </Row>
            </Router>
        );
    }
}