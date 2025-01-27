

const instance = axios.create({
    baseURL: "/",
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
    crossOrigin: null
});

const markdownContent = document.querySelector("section.content div.markdown-body");

if (! localStorage.getItem("currentPage")) {
    localStorage.setItem("currentPage", "about")
    localStorage.setItem("previousPage", "about")
}

window.mdContent = "";

function setLinkAttrs() {
    const allLinks = document.querySelectorAll("a");
    allLinks.forEach(link => {
        // Had to use getAttribute because link.href prepended the origin
        let href = link.getAttribute("href");

        // Highlight the heading that the TOC link points to
        if (href.startsWith("#")) {
            link.addEventListener('click', (event)=> {
                let allSelected = document.querySelector(".selected");
                if (allSelected) {
                    allSelected.forEach(el => {
                        el.classList.toggle("selected");
                    });
                }

                let targetHeading = document.querySelector(href);
                targetHeading.classList.add("selected");
            })
            return
        }

        // Ensure that external links open in a new tab
        if (! href.startsWith("/")) {
           link.target = "_blank";
           return
        }

        // Ensure that all links pointing to media files download instead of open
        if (href.startsWith("/media")) {
            link.download = true;
            return
        }
    });
}

function renderContent(pageName, headingLink) {
    instance.request({
        url:  `content/${pageName}.md`,
        method: "GET",
        data: {},
        headers: {}
    }).then(function (response) {
        if (response.data ) {
            let curPage = localStorage.getItem("currentPage");
            localStorage.setItem("previousPage", curPage)
            localStorage.setItem("currentPage", pageName)


            window.mdContent = response.data;
            markdownContent.innerHTML = window.marked.parse(window.mdContent);
            let codeBlocks = markdownContent.querySelectorAll("pre code");
            codeBlocks.forEach(codeBlock => {
                setLangAttribute(codeBlock);
            });
            setLinkAttrs();
            if (headingLink) {
                let headingToScrollTo =  document.getElementById(`${headingLink.slice(1)}`);
                headingToScrollTo.scrollIntoView("alignToTop")
            }
            markdownContent.dispatchEvent(mdRenderedEvent);
        }
        else {
            console.log(`Axios error: ${response.statusText}`)
        }
    });
}

window.renderContent = renderContent
