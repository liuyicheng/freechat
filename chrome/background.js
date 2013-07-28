chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.command == "selected-tab") {
        chrome.tabs.getSelected(null, sendResponse);
    }
});