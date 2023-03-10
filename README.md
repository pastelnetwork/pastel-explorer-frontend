<div align=center>
  
  [<img height="100px" src="src/assets/pastel-logo.svg" />](https://pastel.network/)
  
</div>

<p align=center>
  <b>Pastel Explorer Website (Frontend)</b>
</p>

<div align=center>
  
  [![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fshields.io)](https://explorer.pastel.network/)
  [![Language](https://img.shields.io/badge/language-Typescript-%232b7489)](https://github.com/pastelnetwork/pastel-electron-wallet/search?q=typescript)
  
</div>

---

## Project Structure
```
Project Root
├── "configuration-files"
│ 
├── public
│   └── static
│ 
└── src
    ├── components
    │   └── pascal-case-component-name
    │       ├── PascalCaseComponent.tsx
    |       └── PascalCaseComponent.styles.ts
    │
    └── pages
        └── pascal-case-page-name
            ├── PascalCasePage.tsx
            ├── PascalCasePage.helpers.tsx
            └── PascalCasePage.styles.ts
```

## Naming Conventions

-   Use PascalCase to name React Components (put them into `src/components/` structure), and
    `export default` an unnamed component
-   Use PascalCase to
    name the pages (put them into `src/pages/` structure)
-   Use camelCase to name variables, constants, functions, and methods
-   Use PascalCase to name classes
-   Use a single underscore in front of a method name to indicate private (non-public) methods



## Run Frontend for Development

Make dot env file from the example one.

```bash
cp .env.example .env
```

Run the app in the development mode.  

```bash
yarn start
```


## Production Deployment

Make sure you use the proper env variables when building the app in the CI/CD pipeline.

## Run Tests

To run the type check and unit tests, use the following command:

```bash
yarn test
```