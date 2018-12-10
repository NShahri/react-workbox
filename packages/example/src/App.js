import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {UpdateAvailable, UpdateActivatedReload, UpdateActivated, WorkBoxProvider} from "react-workbox";

class App extends Component {
    constructTime = new Date();

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
                            Update Available - You need to close all tabs on reopen your browser
                            to be able to use new version.
                        </UpdateAvailable>
                        <UpdateActivated>
                            Update Activated - You can see this message because dev tools is used
                            to activate the new version by using skip waiting
                        </UpdateActivated>
                    </header>
                </div>
            </WorkBoxProvider>
        );
    }
}

export default App;
