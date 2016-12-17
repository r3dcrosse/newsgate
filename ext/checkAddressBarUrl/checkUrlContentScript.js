// THIS FUNCTION MAKES THE INITIAL CALL ON PAGE LOAD
// TO checkUrlBackground.js
chrome.runtime.sendMessage({ action: 'getUrl' }, function(getUrlResponse) {
  console.log('The current url is: ', getUrlResponse.url);

  // Do not make calls to view functions if in disabled state
  if (getUrlResponse.disabled) {
    return;
  }

  // Get whitelist to check if current URL is whitelisted, don't update DOM if so
  chrome.storage.sync.get('whiteListedURLs', function(results) {
    if (!isInWhitelist(results.whiteListedURLs, getUrlResponse.url)) {
      // Make a second call once the address url bar is determined whether to render the alert banner
      // or render the hrefs in the DOM (both functions are in ext/views
      chrome.runtime.sendMessage({ action: 'checkUrl', url: getUrlResponse.url },
        function(checkUrlResponse) {
          console.log('Response from checkUrl came back.', checkUrlResponse);
          if ( checkUrlResponse.fake ) {
            console.log('This is a fake site: ', getUrlResponse.url);
            alertFakeSite();
          } else {
            renderDom();
          }
      });

    }
  });

  // Helper function: returns true if url is in the whiteListArray, false if not
  var isInWhitelist = function(whiteListArray, url) {
    // First check if anything is in whitelist
    if (whiteListArray.length === 0) {
      return false; // THE URL IS NOT IN WHITELIST
    }
    // Now check if URL is in the whitelist array
    return whiteListArray.indexOf(url) === -1 ? false : true;
  };
});
