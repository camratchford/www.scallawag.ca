

const navButtons = document.querySelectorAll('li.header-navlist--item input');

navButtons.forEach(button => {
    button.addEventListener('click', (event)=> {
        console.log(`Clicked ${button.value} button`);
        window.renderContent(button.value);
    })
})

const queryTextFunctionMap = new Map();

function previousPage() {
    let prevPage = localStorage.getItem("previousPage");
    window.renderContent(prevPage);
}

queryTextFunctionMap.set("previousPage", previousPage);

window.navigation.addEventListener("navigate", (event) => {
    let url = event.destination.url;
    let queryText = url.split("/").slice(-1)[0];

    if (queryText[0] === "?") {
        // Ensure that headings are scrolled to after rendering markdown content
        let headingLink = "";
        if (queryText.includes("#")) {
            let splitQueryText = queryText.split("#");
            queryText = splitQueryText[0];
            headingLink = `#${splitQueryText[1]}`
        }
        if (queryTextFunctionMap.has(queryText.slice(1))) {
            let queryTextFunction = queryTextFunctionMap.get(queryText.slice(1))
            queryTextFunction()
        } else if (queryText.slice(-3) === ".md") {
            window.renderContent(queryText.slice(1, -3), headingLink);
        }
        event.preventDefault();
    }
})