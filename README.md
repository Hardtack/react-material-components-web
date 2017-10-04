React Material Components Web
=============================

[![License: MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/react-material-components-web.svg)](https://www.npmjs.com/package/react-material-components-web)
[![Build Status](https://img.shields.io/travis/react-mdc/react-material-components-web.svg)](https://travis-ci.org/react-mdc/react-material-components-web)


React wrapper of [Material Components Web](
https://github.com/material-components/material-components-web)

Under Active Development
------------------------

The project is under active development.

Every updates can contain breaking changes before 0.2.0.

We **do not** recommend you to use this library for produciton applications at this time.

Documentation
-------------

You can find documentation with live demo at https://react-mdc.github.io/

Features
--------

*  Typed strictly with [TypeScript](http://typescriptlang.org)

   You can access typing support by also using TypeScript

*  Stylesheet independent

   Since *Material Components Web* can be customized with scss,
   it does not depend on specific stylesheet.
   You can load your own stylesheet or a default one.

*  Each component packaged individually

   Like *Material Components Web*, You can access all components individually,
   under [@react-mdc npm scope](https://www.npmjs.com/%7Ereact-mdc).

Getting Start
-------------

Install the library

``` bash
$ npm install --save @react-mdc/typography
```

Import the stylesheet

``` html
<link type="text/css" href="/static/material-components-web.min.css" rel="stylesheet" />

```

Or load using webpack and scss-loader

`my-mdc.scss`
``` scss

// My main Sass file.
$mdc-theme-primary: #9c27b0;
$mdc-theme-accent: #76ff03;
$mdc-theme-background: #fff;

@import "material-components-web/material-components-web";

```

`app.js`
``` javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import "./stylesheets/my-mdc.scss";
import Main from './main.js';

ReactDOM.render(<Main />, document.getElementById('root'));

```

And import *@react-mdc* then give it a shot.

`main.js`
``` typescript

import * as React from "react";
import Typography from "@react-mdc/typography";

export default class Main extends React.Component<{}, {}> {
    render () {
        return (
            <Typography>
                <Typography.Title>
                    This is an example
                </Typography.Title>
                <Typography.Body2>
                    Hello world!
                </Typography.Body2>
            </Typography>
        );
    }
}

```

Setup for Development
---------------------

Bootstrap

``` shell

$ lerna bootstrap

```

Build

``` shell

$ npm run build

```


Run Docs
--------

``` shell

$ cd docs
$ npm start

```

Watch for Changes and Build
---------------------------

``` shell

$ npm run watch

```


Run Test
--------

``` shell

$ npm test

```

to watch

``` shell

$ npm test:watch

```

