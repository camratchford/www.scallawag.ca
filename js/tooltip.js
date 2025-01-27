


const tooltip = {
    name: 'tooltip',
    level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
    start(src) { return src.match(/(?<=^|^\s)(\{t:)/); },    // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /^((\{t:)(.*?)(,)(.+)(}))/;  // Regex for the complete token, anchor to string start
        const match = rule.exec(src);

        if (match) {
            let token =  {
                type: 'tooltip',
                raw: match[0],
                tooltipTarget: match[3],
                tooltipText: match[5],
                tokens: [],
            };
            return token;
        }
    },
    renderer(token) {
        return `
            <div class="tooltip" data-target="${token.tooltipTarget}">
                <span class="tooltip-text">${token.tooltipText}</span>
            </div>
        `;
    },
};

function createTooltipEventListener() {
    const toolTips = document.querySelectorAll("div.tooltip");
    if (toolTips) {
        toolTips.forEach((el) => {
            let tooltipTarget = el.getAttribute("data-target");
            let tooltipTargetEl = document.querySelector(tooltipTarget);
            console.log(tooltipTargetEl.tagName)
            if (tooltipTargetEl) {
                tooltipTargetEl.onmouseenter = (e) => {
                    let markdownBody = document.querySelector(".markdown-body");
                    let markdownBodyOffset = markdownBody.getBoundingClientRect();
                    let targetOffset = tooltipTargetEl.getBoundingClientRect();

                    el.classList.toggle("active");
                    // Right the right-hand side of the object
                    let top = targetOffset.top - markdownBodyOffset.top + targetOffset.height

                    // Right the right-hand side of the object
                    let left = targetOffset.left - (markdownBodyOffset.left - targetOffset.width)

                    el.style.top = `${top}px`;
                    el.style.left = `${left}px`;

                };
                tooltipTargetEl.onmouseleave = (event) => {
                    el.classList.toggle("active");
                };
            }
        });
    }
}


window.mdRenderedEventCallbacks.push(createTooltipEventListener)




marked.use({ extensions: [tooltip] });