# Marked Extensions

Contained in this directory are a few marked.js extensions.

| Name      | Use-case                                                                                  | Syntax                                                       |
|-----------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| bubble    | "I need more emphasis than bold or underline, I need borders and a background".           | inline: `()$text(/)`, <br>block:<br>`()`<br>`$text`<br>`(/)` | 
| button    | "I need a simple user interface element, but object to using an `a` element as a button." | `{b:$href,$text}`                                            |
| column    | "I need a table, but don't want the borders or headers."                                  | See 'Column example'                                         |
| plantuml  | "I need diagrams as code"                                                                 | `@startuml`<br>`$umlText`<br>`@enduml`                       |
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

```markdown
{b:/?OptionA, Option A}

{b:/?OptionB, Option B}
```

## Column example

```markdown

### Links

|==
|= [Link A](/?linkA.md) =|= Something here to explain Link A  =|
|= [Link B](/?linkB.md) =|= Something here to explain Link B  =|
==|

```

## Plantuml example

```markdown

See diagram below:

@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml


```


## Tooltip example

```markdown

[a link that needs a tooltip](/?example)

{t:p a[href='/?example'],Tooltip text here}

```