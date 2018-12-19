// @flow

import React, {Component} from 'react';

import type {Node} from 'react';

import WorkBoxContext from './WorkBoxContext';
import {register, unregister} from './serviceWorker';

type Props = {|
    children: Node,
    disabled: boolean,
    serviceWorkerUrl: string,
    interval: number,
    onError: Error => void,
|};

type State = {|
    isUpdateAvailable: boolean,
    isUpdateActivated: boolean,
|};

class WorkBoxProvider extends Component<Props, State> {
    static defaultProps = {
        disabled: process.env.NODE_ENV !== 'production',
        serviceWorkerUrl: `/service-worker.js`,
        interval: 60 * 60 * 1000, // 1 hour
        onError: (error: Error) => console.error('Error during service worker registration:', error),
    };

    state = {
        isUpdateAvailable: false,
        isUpdateActivated: false,
    };

    timer = null;

    setCheckUpdateTimer = (registration: ServiceWorkerRegistration) => {
        const {interval} = this.props;

        this.timer = setInterval(() => {
            registration.update();
        }, interval);
    };

    componentDidMount() {
        const {serviceWorkerUrl, disabled, onError} = this.props;

        if (disabled) {
            unregister();
        } else {
            register({
                serviceWorkerUrl: serviceWorkerUrl,
                onRegister: this.setCheckUpdateTimer,
                onUpdate: () => this.setState({isUpdateAvailable: true}),
                onActivate: () => this.setState({isUpdateAvailable: false, isUpdateActivated: true}),
                onError: onError,
            });
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        const {children} = this.props;
        const {isUpdateAvailable, isUpdateActivated} = this.state;

        return (
            <WorkBoxContext.Provider value={{isUpdateAvailable, isUpdateActivated}}>{children}</WorkBoxContext.Provider>
        );
    }
}

export default WorkBoxProvider;
