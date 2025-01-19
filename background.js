/**
 * Listens for outgoing requests to Google and modifies the query parameter.
*/
browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = new URL(details.url);

        // // Check if the request has already been processed
        // if (processedRequests.has(details.requestId)) {
        //     return;
        // }

        // Check if the URL includes a search query
        if (url.hostname.includes("google.com") && url.searchParams.has("q")) {
            // Add a keyword to the search query
            const currentQuery = url.searchParams.get("q");
            const keyword = "-ai";
            if (!currentQuery.includes(keyword)) {
                console.log(currentQuery);
                const modifiedQuery = `${currentQuery} ${keyword}`; // Replace 'yourKeyword' with your desired keyword
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
