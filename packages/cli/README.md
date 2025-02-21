# ShweUI CLI

A CLI for adding components to your project.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx shweui init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shweui add [component]
```

### Example

```bash
npx shweui add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shweui add
```
