<a href="https://excalidraw.com/" target="_blank" rel="noopener">
  <picture>
    <source media="(prefers-color-scheme: dark)" alt="Excalidraw" srcset="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/github/excalidraw_github_cover_2_dark.png" />
    <img alt="Excalidraw" src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/github/excalidraw_github_cover_2.png" />
  </picture>
</a>

<h4 align="center">
  <a href="https://excalidraw.com">Excalidraw Editor</a> |
  <a href="https://plus.excalidraw.com/blog">Blog</a> |
  <a href="https://docs.excalidraw.com">Documentation</a> |
  <a href="https://plus.excalidraw.com">Excalidraw+</a>
</h4>

<div align="center">
  <h2>
    An open source virtual hand-drawn style whiteboard. </br>
    Collaborative and end-to-end encrypted. </br>
  <br />
  </h2>
</div>

<br />

<div align="center">
  <figure>
    <a href="https://excalidraw.com" target="_blank" rel="noopener">
      <img src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/github%2Fproduct_showcase.png" alt="Product showcase" />
    </a>
    <figcaption>
      <p align="center">
        Create beautiful hand-drawn like diagrams, wireframes, or whatever you like.
      </p>
    </figcaption>
  </figure>
</div>

## Feature Implementation Cycle

The Feature implemented in Excalidraw is the addition of 💾&nbsp; Brainstorm Button on Screen.
It fetches questions based on selected elements on the whiteboard for brainstorming

The Cycle of development is as follows:

- 💯&nbsp;Added Brainstorming Button ->  packages/excalidraw/components/layerUI.tsx
- 🎨&nbsp;Implemented button Functionality -> packages/excalidraw/components/BrainstormButton.tsx
- ✍️&nbsp;Added styling -> packages/excalidraw/components/BrainstormButton.scss
- 🌓&nbsp;Implemented on click action -> packages/excalidraw/actions/actionBrainstorming.tsx
- 🏗️&nbsp;Added hugging face api fetch -> packages/utils/hfAI.tsx  
- 📷&nbsp;Added API key -> .env.development
- 😀&nbsp;Added new states to App's state -> 
- 👅&nbsp;Enhanced localization (i18n) support -> packages/excalidraw/locales/en.json

[Feature Video](https://github.com/your-use/your-repository/public/chrome_HlxaA8qsXp.mp4)

## Quick start

**Note:** following instructions are for installing the Excalidraw [npm package](https://www.npmjs.com/package/@excalidraw/excalidraw) when integrating Excalidraw into your own app. To run the repository locally for development, please refer to our [Development Guide](https://docs.excalidraw.com/docs/introduction/development).

```
npm install react react-dom @excalidraw/excalidraw
```

or via yarn

```
yarn add react react-dom @excalidraw/excalidraw
```

Check out our [documentation](https://docs.excalidraw.com/docs/@excalidraw/excalidraw/installation) for more details!