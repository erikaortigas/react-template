# react-template-js


### Running the project
```bash
npm run dev
```

### Building
```bash
npm run dev:build
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
