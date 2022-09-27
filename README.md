<div align=center>
  
  [<img height="100px" src="src/assets/pastel-logo.svg" />](https://pastel.network/)
  
</div>

<p align=center>
  <b>Pastel Explorer Website (Frontend)</b>
</p>

<div align=center>
  
  [![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fshields.io)](https://explorer.pastel.network/)
  ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/pastelnetwork/pastel-explorer-frontend)
  [![Language](https://img.shields.io/badge/language-Typescript-%232b7489)](https://github.com/pastelnetwork/pastel-electron-wallet/search?q=typescript)
  
</div>

---


## Development

Make dot env file from the example one.

```bash
cp .env.example .env
```

Run the app in the development mode.  

```bash
yarn start
```

Run tests.

```bash
yarn test
```

## Production Deployment

Make sure you use the proper env variables when building the app in the CI/CD pipeline.
