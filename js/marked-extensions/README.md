# Marked Extensions

Contained in this directory are a few marked.js extensions.

| Name      | Use-case                                                                                  | Syntax                                                       |
|-----------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| bubble    | "I need more emphasis than bold or underline, I need borders and a background".           | inline: `()$text(/)`, <br>block:<br>`()`<br>`$text`<br>`(/)` | 
| button    | "I need a simple user interface element, but object to using an `a` element as a button." | `{b:$href,$text}`                                            |
| column    | "I need a table, but don't want the borders or headers."                                  | See 'Column example'                                         |
| plantuml  | "I need diagrams as code"                                                                 | `{plantuml:$pumlFileName,$text}`                             |
| tooltip   | "I need to provide the user with optional text that describes an element"                 | `{t:$CSSSelector,$text}`                                     |


## Bubble example

### Inline

```markdown
This is a paragraph, where I need emphasis on this [()link(/)](https://example.com) , mid-paragraph.

It also works without embedded links like in ()this(/) example.
```

### Block

```markdown

()
You can also do an entire block <br>
Like this...
(/)

```

## Button example

> Empty lines are required between buttons

```markdown
{b:/?OptionA, Option A}

{b:/?OptionB, Option B}
```

## Column example

### 2 column example

```markdown

|==
|= [Link A](/?md=linkA.md) =|= Something here to explain Link A  =|
|= [Link B](/?md=linkB.md) =|= Something here to explain Link B  =|
==|

```

### 3 column example

> Note the start block and end block sequences require 3 `=` symbols

```markdown

|===
|= [Link A](/?md=linkA.md) =|= Something here to explain Link A  =|= Another column about Link A =|
|= [Link B](/?md=linkB.md) =|= Something here to explain Link B  =|= Another column about Link B =|
===|

```

## Plantuml example

> Assumes there's a file named `network-diagram.puml` in the ./content directory (relative to index.html)

```markdown

See diagram below:

{plantuml:network-diagram,Network Diagram}

```


## Tooltip example

### Inline text

> Empty lines are required between tooltips

```markdown

[a link that needs a tooltip](/?md=example)

[another link that needs a tooltip](/?md=another_example)

{t:p a[href='/?md=example'],Tooltip text here}

{t:p a[href='/?md=another_example'],Another tooltip text here}

```

### Image element

```markdown

I just think they're <span id="neat">neat</span>

{t:span#neat,<img class="img-neat" src="https://i.kym-cdn.com/entries/icons/original/000/029/906/DjoYh9xUUAA0IYv-2.jpg">}


```