/**
 * Listens for outgoing requests to Google and modifies the query parameter.
*/

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
            const modifiedQuery = `${currentQuery} ${keywords}`;
            url.searchParams.set("q", modifiedQuery);

            return { redirectUrl: url.toString() };
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
        chrome.storage.local.get(['ai-search-off', 'custom-search', "yt-music", "reddit", "exclude"], items => {
            console.log("items", items);
            items['custom-search'] && keywords.push(items['custom-search']);
            if (items['exclude']) {
                keywords.push(items['exclude'].split(" ").map(word=> "-"+word).join(" "));
            }
            items['ai-search-off'] && keywords.push("-ai");
            // TODO: Add or if it's both
            items["yt-music"] && keywords.push("site:music.youtube.com");
            items["reddit"] && keywords.push("site:reddit.com");
            console.log("keywords", keywords);
            resolve(keywords.join(" "));
        });
    })
}