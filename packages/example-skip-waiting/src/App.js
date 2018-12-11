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
                            Update Available - This message should not be visible,
                            as the new version should be activated asap.
                        </UpdateAvailable>
                        <UpdateActivated>
                            <button
                                onClick={() => window.location.reload()}>Update Activated - Click to Refresh
                            </button>
                        </UpdateActivated>
                    </header>
                </div>
            </WorkBoxProvider>
        );
    }
}

export default App;