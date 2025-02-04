

const navButtons = document.querySelectorAll('li.header-navlist--item input');

navButtons.forEach(button => {
    button.addEventListener('click', (event)=> {
        window.renderContent(button.value);
    })
})

const queryTextFunctionMap = new Map();

function previousPage(searchParams) {
    let prevPage = localStorage.getItem("previousPage");
    window.renderContent(prevPage);
}
queryTextFunctionMap.set("previousPage", previousPage);

function markdown(searchParams) {
    let md = searchParams.get("md");
    let id = searchParams.get("id");
    window.renderContent(md, id);
}
queryTextFunctionMap.set("md", markdown)


function navigateFromURL(url) {
    let searchParams = new URL(url).searchParams;
    let matched = false;
    [...queryTextFunctionMap.keys()].forEach(keyName => {
        let func = queryTextFunctionMap.get(keyName);
        if (searchParams.has(keyName)) {
            func(searchParams)
            matched = true;
        }
    })
    if (! matched) {
        window.renderContent("about.md");
    }
}

window.navigation.addEventListener("navigate", (event) => {
    let url = event.destination.url;
    navigateFromURL(url);
    event.preventDefault()
});
