let { Marked } = globalThis.marked;
const { markedHighlight } = globalThis.markedHighlight;
const { gfmHeadingId  } = globalThis.markedGfmHeadingId;
const marked  = new Marked(
    markedHighlight({
        emptyLangClass: 'markdown-codeblocks',
        langPrefix: 'markdown-codeblocks language-',
        highlight(code, lang, info) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        }
    })
);


marked.use(gfmHeadingId({prefix: "md-"}))
window.marked = marked;

