import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

const initialState = {
    input: "",
    imageURL: "",
    box: {},
    route: "SignIn",
    isSignedIn: false,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ''
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            left: clarifaiFace.left_col * width,
            top: clarifaiFace.top_row * height,
            right: width - (clarifaiFace.right_col * width),
            bottom: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({ box: box })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
        this.setState({ imageURL: this.state.input });
        fetch('https://protected-gorge-49207.herokuapp.com/imageURL', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageURL: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://protected-gorge-49207.herokuapp.com/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            this.setState(Object.assign(this.state.user, { entries: count }))
                        })
                        .catch(console.log)
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err))
    }

    onRouteChange = (route) => {
        if (route === 'SignIn') {
            this.setState(initialState)
        } else if (route === 'home') {
            this.setState({ isSignedIn: true })
        }
        this.setState({ route: route })
    }

    render() {
        const { isSignedIn, imageURL, route, box } = this.state;
        return (
            <div className="App">
                <Particles className="particles" params={particlesOptions} />
                <div className="header">
                    <Logo />
                    <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                </div>
                {route === "home" ?
                    <div>
                        <Rank name={this.state.user.name} entries={this.state.user.entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition box={box} imageURL={imageURL} />
                    </div>
                    : (
                        route === "SignIn" ?
                            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }
}

export default App;
