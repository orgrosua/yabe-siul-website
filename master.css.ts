import type { Config } from '@master/css';

import twColors from 'tailwindcss/colors';

const config = {
    styles: {},
    rules: {},
    variables: {},
    semantics: {},
    mediaQueries: {},
    animations: {},
    selectors: {},
    functions: {},
} as Config;

Object.keys(twColors).forEach((name) => {
    config.variables[`tw-${name}`] = twColors[name];
});

export default config;