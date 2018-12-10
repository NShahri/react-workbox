import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {UpdateAvailable, UpdateActivatedReload, UpdateActivated, WorkBoxProvider} from "react-workbox";

class App extends Component {
    constructTime = new Date();

    onUpdateClick = async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        registration.waiting.postMessage('skipWaiting');
    };

    render() {
        return (
            <WorkBoxProvider interval={30 * 1000}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <p>
                            Constructed on {this.constructTime.toLocaleString()}.
                        </p>
                        <UpdateAvailable>
                            <button
                                onClick={this.onUpdateClick}>Update
                                Available - Click to Install
                            </button>
                        </UpdateAvailable>
                        <UpdateActivatedReload/>
                    </header>
                </div>
            </WorkBoxProvider>
        );
    }
}

export default App;
