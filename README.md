# Quick start

## Development

### Helpful tips

- You can use `console.log(window.kcContext)` to understand what is available in the UI [according to the docs](https://github.com/keycloakify/keycloakify/discussions/792)

## Testing the theme locally

[Documentation](https://docs.keycloakify.dev/testing-your-theme)

## How to customize the theme

[Documentation](https://docs.keycloakify.dev/customization-strategies)

Tailwind and DaisyUI are set up. Where possible, use `@apply` on the Keycloakify CSS classes. See [`overrides.css`](/src/login/overrides.css) for usage.

## Building the theme

You need to have [Maven](https://maven.apache.org/) installed to build the theme (Maven >= 3.1.1, Java >= 7).  
The `mvn` command must be in the $PATH.

- On macOS: `brew install maven`
- On Debian/Ubuntu: `sudo apt-get install maven`
- On Windows: `choco install openjdk` and `choco install maven` (Or [download](https://maven.apache.org/download.cgi))

```bash
npm run build-keycloak-theme
```

Note that by default Keycloakify generates multiple .jar files for different versions of Keycloak.  
You can customize this behavior, [see documentation](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets).

## Create a new story

Used to create pages that will appear in Storybook.

```bash
npx keycloakify add-story
```

## Eject a page

When applying Tailwind to classes is not enough, eject the page to customize the React components.

```bash
npx keycloakify eject-page
```

## Initializing the account theme

```bash
npx keycloakify initialize-account-theme
```

## Initializing the email theme

```bash
npx keycloakify initialize-email-theme
```

## GitHub Actions

The starter comes with a generic GitHub Actions workflow that builds the theme and publishes
the jars [as GitHub releases artifacts](https://github.com/keycloakify/keycloakify-starter/releases/tag/v10.0.0).  
To release a new version **just update the `package.json` version and push**.

To enable the workflow go to your fork of this repository on GitHub then navigate to:
`Settings` > `Actions` > `Workflow permissions`, select `Read and write permissions`.
