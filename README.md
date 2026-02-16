# Create react native project

```
npx create-expo-app my-app
```

# Config tailwind (naitivewind)

```
npm install nativewind

npm install --save-dev tailwindcss

npx tailwindcss init
```
## Add babel.config.js

```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            // ВАЖЛИВО: цей плагін має бути останнім
            "react-native-reanimated/plugin",
        ],
    };
};
```

## Add nativewind-env.d.ts

## Add metro.config.js

```
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
```

## Add global.css

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```