/**
 * Listens for outgoing requests to Google and modifies the query parameter.
*/

// chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (e) => {
chrome.webRequest.onBeforeRequest.addListener( async (e) => {
    const url = new URL(e.url);
    // // Check if the request has already been processed
    // if (processedRequests.has(details.requestId)) {
    //     return;
    // }

    // Check if the URL includes a search query
    if (url.hostname.includes("google.com") && url.searchParams.has("q")) {
        // Add a keyword to the search query
        const currentQuery = url.searchParams.get("q");
        const keywords = await getKeywords();
        console.log("Keywords", keywords);
        if (!currentQuery.includes(keywords)) {
            console.log("currentQuery", currentQuery);
            const modifiedQuery = `${currentQuery} ${keywords}`; // Replace 'yourKeyword' with your desired keyword
            url.searchParams.set("q", modifiedQuery);

            return { redirectUrl: url.toString() }; // Redirect to the modified URL
        } else {
            console.log('here');
            return;
        }
    }
    },
    {
        urls: ["*://*.google.com/search*"], // Listen only for Google search requests
    },
    ["blocking"] // Ensure the request is blocked and modified before it proceeds
);

async function getKeywords() {
    return new Promise(resolve => {
        let keywords = [];
        chrome.storage.local.get(['ai-search'], items => {
            console.log("items", items);
            let result = items['ai-search'] ? "" : "-ai";
            resolve(result);
        });
    })
}