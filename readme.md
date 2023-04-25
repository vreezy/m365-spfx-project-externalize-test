# cli-m365-spfx-project-externalize-test-suite

We want to test the "m365 spfx project externalie" command from <https://github.com/pnp/cli-microsoft365>

## Setup

have a project folder. git clone following projects:

- this
- <https://github.com/pnp/cli-microsoft365>
- <https://github.com/pnp/sp-dev-fx-webparts>
- ... add some other spfx projects.

finally you should have this folder structure then:

- projects
  - m365-spfx-project-externalize-test
  - cli-microsoft365
  - sp-dev-fx-webparts
  - {other-spfx-project}
  - ...

```bash
  npm install
```

## Analyze

Uninstall Globla cli m365

```bash
  npm uninstall -g @pnp/cli-microsoft365
```

test the "m365" command should be not be found.

Go to cli-microsoft365 and

```bash
  npm install 
```

OR

open in devCointainer with Docker

make some changes on the externalize command

```bash
  npm run build
```

go with your node shell in the cli-microsoft365/dist directory

```bash
  npm link
```

now the "m365" command should work again globally.

go to "m365-spfx-project-externalize-test"

```bash
  npm run analyze
```

## Output

the "out" Directory will be generated
