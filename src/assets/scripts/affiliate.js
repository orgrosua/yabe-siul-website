// Affiliate script

const hostname = 'rosua.org';
const affiliateCookieKey = 'affiliate-wp-ref';
const currentUrl = new URL(window.location.href);
let affiliateId = null;

// check for the affiliate id
if (currentUrl.searchParams.has('ref')) {
    affiliateId = currentUrl.searchParams.get('ref');
    document.cookie = `${affiliateCookieKey}=${affiliateId}; max-age=2592000; path=/`;
} else if (document.cookie.includes(affiliateCookieKey)) {
    affiliateId = document.cookie.split('; ').find(row => row.startsWith(affiliateCookieKey)).split('=')[1];
}

// if the affiliate id exists, observe the DOM for changes and call transferAff
if (affiliateId) {
    // watch for changes to the DOM and set affiliateId to the url if it exists
    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                transferAff(document);
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // remove the affiliate id from the current url
    currentUrl.searchParams.delete('ref');
    window.history.replaceState({}, document.title, currentUrl.href);
}

function transferAff(document) {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.hostname === hostname) {
            // check if the link doesn't already have ref in the query params
            if (!link.href.includes('ref=')) {
                const url = new URL(link.href);
                url.searchParams.set('ref', affiliateId);
                link.href = url.href;
            }
        }
    });
}