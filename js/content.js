

function initPage() {
    let pageRequested = document.location.toString();
    let currentPage = localStorage.getItem("currentPage");
    if (currentPage && ! (pageRequested.indexOf("?md=") !== -1)) {
        renderContent(currentPage);
    } else {
        navigateFromURL(document.location.toString());
    }
}

