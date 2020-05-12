<p align="center">
LOGO
</p>

<h1 align="center">Sha-el-design</h1>

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md) 

<div align="center">

[React](https://reactjs.org/) components for easier customization and smooth development flow. Based heavily on [Material-Ui](https://material-ui.com/) and [Ant Design](https://ant.design/).

</div>

## 🔥 Features

- 🌹 Material inspired designed.
- 📦 A complete package of ui resource for any React project.
- 🛡 Made with ❤ using Typescript.
- 🎨 Easy theme customization using `ThemeContext`.
- 🤏 Smaller Footprint @ 7kb without compression.

## 🎛 Environment Support

- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 🔧 Installation

Sha-el-design is available as an [npm package](https://www.npmjs.com/package/sha-el-design).

```sh
// with npm
npm install sha-el-design

// with yarn
yarn add sha-el-design
```

## 🃏 Usage

Simple example for you to get started.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'sha-el-design';

function App() {
  return (
    <Button type='primary'>Hello World</Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```

## 💫 Examples

Comming soon 🙃

## ✍ Documentation

Check out our [Storybook](https://sha-el-design.netlify.app/).

## 🎨 Theming

Sha-el-design supports Theming(DARK 👻 and LIGHT) out of box using `ThemeContext`.

```jsx
import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'sha-el-design/lib/components/Theme/Theme';

export class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme="DARK">
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              ...
            </Route>
            <Route path="/home">
              ...
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
```

## 🤝 Contributing

Just follow [this](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github) and [this](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

Make sure coding quality is best you can come up with also please be polite to everyone.

We would love a PR from you (I should make sense though).

## 👩‍💻 Changelog

Will add from next update onwards.

## 🛣 Roadmap



## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
