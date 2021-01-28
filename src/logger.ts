import {name} from '../package.json';

enum LoggerMethods {
    debug = 'debug',
    log = 'log',
    warn = 'warn',
    error = 'error',
    groupCollapsed = 'groupCollapsed',
    groupEnd = 'groupEnd',
}

const methodToColorMap: {[methodName in LoggerMethods]: string | null} = {
    [LoggerMethods.debug]: '#7f8c8d', // Gray
    [LoggerMethods.log]: '#2ecc71', // Green
    [LoggerMethods.warn]: '#f39c12', // Yellow
    [LoggerMethods.error]: '#c0392b', // Red
    [LoggerMethods.groupCollapsed]: '#3498db', // Blue
    [LoggerMethods.groupEnd]: null, // No colored prefix on groupEnd
};

let inGroup = false;

const print = function (method: LoggerMethods, args: unknown[]) {
    const styles = [
        `background: ${methodToColorMap[method]}`,
        `border-radius: 0.5em`,
        `color: white`,
        `font-weight: bold`,
        `padding: 2px 0.5em`,
    ];

    // When in a group, the prefix is not displayed.
    const logPrefix = inGroup ? [] : [`%c${name}`, styles.join(';')];

    // eslint-disable-next-line no-console
    console[method](...logPrefix, ...args);

    if (method === 'groupCollapsed') {
        inGroup = true;
    }
    if (method === 'groupEnd') {
        inGroup = false;
    }
};

const logger = Object.fromEntries(
    Object.values(LoggerMethods).map((method) => [
        method,
        (...args: unknown[]) => {
            if (process.env.NODE_ENV !== 'production') print(method, args);
        },
    ])
);

export default logger;
