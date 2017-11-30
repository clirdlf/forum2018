# forum2018
DLF Forum 2018 theme customizations

# Setup

### VVV
Install [Varying Vagrant Vagrants](https://varyingvagrantvagrants.org)

Edit `vvv-custom.yml` and add a new host:

```yml
vvvforum:
  repo: https://github.com/Varying-Vagrant-Vagrants/custom-site-template.git
  hosts:
    - forum2018.dev
```

Provision the server:

```
$ vagrant reload --provision
```

### Gulp

Install the dependencies

```
$ npm install
```

Create a `.env` file with the following:

```
DEV_URL=forum2018.dev
DEV_PORT=8888
```

# Layout

The main `style.css` file loads `stylesheets/main.css` which is the generated file of the SCSS in `_sass`. These are generated with `gulp` tasks and can be run in the project with:

```
$ gulp
```

As long as the vagrant server is running (and the `.env`) file is up-to-date, this will launch your default browser (with [BrowserSync](https://www.browsersync.io)) that you can test multiple browsers at once at [http://localhost:8888](http://localhost:8888).

## JavaScript

JavaScript updates are done in `src/scripts.js` and built in to `js` with `gulp`. 
