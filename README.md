# [www.scallawag.ca](https://www.scallawag.ca)

Cam Ratchford's personal website and portfolio.


## Story

After years of putting it off, I finally built my own site, which you can find [here](https://www.scallawag.ca).

I wanted a static site that I could write in Markdown. I could have used any number of static site generators, but
I also wanted to have fun building it. So here we have yet another static site generator, with a bunch of features
that I thought would be nice to have.


## Features

### Additional Marked.js Extensions

These extensions consumed most of the development time. 
As a result, my regex skills are now sharpened to a point.

- PlantUML blocks: 
  - "I need diagrams as code"
- Column blocks: 
  - "I need a table, but don't want the borders or headers".
- Inline buttons: 
  - "I need a simple user interface element, but object to using an `a` element as a button."
- Inline tooltips: 
  - "I need to provide the user with optional text that describes an element"
- Bubble blocks / inline bubbles: 
  - "I need more emphasis than bold or underline, I need borders and a background".

### 'Single-page Application' Behaviour

- Custom navigation event handling, capturing [Navigate Events](https://developer.mozilla.org/en-US/docs/Web/API/Navigation/navigate_event), 
  and preforming actions based on the query string. 
  - Since it doesn't have a 'backend' per se, I needed to figure out how to use Markdown hyperlinks to change which markdown file is being 
   rendered. Because I'm preventing the default `navigate` event behaviour, I needed to restore some of the navigational features:
      - Rendering a markdown page: 
        - Makes a request to Nginx for the file specified, generating the HTML from its contents.
      - Scrolling to an HTML ID:
        - Uses the `Event.scroll()` method to scroll the window the corresponding HTML ID.
      - Rendering the previously rendered markdown page: 
        - Calls the render function with the 'previous page' string as an argument. The current and previous page
          are stored in LocalStorage upon successful page render.


## Front-end

A single HTML file, a lot of _vanilla_ JavaScript, some CSS, and the Markdown files that are rendered into HTML.

### Built Using

- [markedjs/marked](https://github.com/markedjs/marked): 
  - A fully client-side Markdown rendering solution.
- [markedjs/marked-gfm-heading-id](https://github.com/markedjs/marked-gfm-heading-id): 
  - Marked plugin that generates HTML `id` attributes for each Markdown heading element.
- [markedjs/marked-highlight](https://github.com/markedjs/marked-highlight): 
  - Marked plugin that generates the HTML `class` names attributes, necessary for syntax styling HTML `code` elements. 
- [highlightjs/highlight.js](https://github.com/highlightjs/highlight.js): 
  - The module responsible for lexing, parsing, and detecting the language of the HTML `code` within the code elements.
- [sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css): 
  - Serves as a very good starting point for styling Markdown pages. It is extended and modified separately with my own CSS.
- [axios/axios](https://github.com/axios/axios): 
  - Performs asynchronous HTTPS requests, necessary for fetching Markdown and communicating with the PlantUML service.
- [ryanoasis/nerd-fonts](https://github.com/ryanoasis/nerd-fonts):
  - Specifically [JetBrainsMonoNerdFont](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/JetBrainsMono)
  - Used for social icons

## Backend

Not quite what most would consider a _'backend'_; it is composed of an Nginx server and the PlantUML service I built.

### PlantUML Service

The repo for the PlantUML service backend is private, but you're not missing much.

It's a two part system, running on a single container:

1. A single route FastAPI application that converts the PlantUML markup text into a zlib-compressed and base-64 encoded string 
   that the PlantUML server uses to render the image, which is proxied to from Nginx.
2. A [PlantUML server](https://plantuml.com/download) that renders the UML into a PNG and serves it over HTTP, 
   which is also proxied to from Nginx.

### Built Using

- [PlantUML](https://plantuml.com/download)
- [dougn/python-plantuml](https://github.com/dougn/python-plantuml)
- [fastapi/fastapi](https://github.com/fastapi/fastapi)