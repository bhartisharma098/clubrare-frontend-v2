# Test Frontend

Test Frontend:

- Next.js
- Typescript
- TailwindCSS
- Wagmi
- Ethers

## Architecture

```
|-- src
|  |-- abis
|  |  |-- // smart contract abis
|  |-- api-services
|  |  |-- interfaces
|  |-- // backend api call services
|  |-- assets
|  |  |-- css
|  |  |-- fonts
|  |  |-- images
|  |-- context
|  |  |-- connector.tsx
|  |  |-- global.tsx
|  |  |-- overlay.tsx
|  |  |-- index.ts
|  |-- design-systems
|  |  |-- Atoms // the minor pure components
|  |  |-- Molecules // the reusable medium sized components
|  |  |-- Organisms // the reusable large sized components
|  |  |-- Templates // the reusable page templates
|  |  |-- index.ts
|  |-- pages
|  |-- services
|  |  |-- interfaces
|  |  |-- // smart contract call services
|  |-- utils
|  |-- appConfig.ts
|  |-- interfaces.d.ts
|-- next.config.js
|-- tsconfig.json
|-- tailwind.config.js
|-- yarn.lock
```

# Project start
- open terminal
- yarn
- yarn dev