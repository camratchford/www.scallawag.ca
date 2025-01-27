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


const mdRenderedEvent = new Event("mdRendered");
window.mdRenderedEventCallbacks = []

function mdRenderedEventCallback() {
    let currentPage = localStorage.getItem("currentPage");
    console.log(`Rendered md: ${currentPage}`);
}
window.mdRenderedEventCallbacks.push(mdRenderedEventCallback);

const mdBody = document.querySelector("div.markdown-body");
mdBody.addEventListener("mdRendered", (event) => {

    for (let i = 0; i < window.mdRenderedEventCallbacks.length; i++) {
        window.mdRenderedEventCallbacks[i]();
    }
});

