# react-template-js

### Pre requisites
Install
- node (better installed with nvm)
- yarn (npm i -g yarn)

### Running the project
```bash
npm run dev
```

We are also supporting parcel, it is currently faster than webpack, but some features (eslint) is not fully supported

parcel support
```bash
npm run dev -- --parcel
```

### Building
```bash
npm run dev:build
```

parcel support
```bash
npm run dev:build -- --parcel
```

### Testing
```bash
npm run test
```

To run tests in intellij/webstorm, update default mocha config by adding
```
Extra Mocha options: --compilers js:babel-core/register --require ./src/test/core.js
```

Run single test in terminal

```bash
npm run test:only src/sample.test.js
```   
