// THIS IS A BACKGROUND SCRIPT THAT GRABS THE URL FROM THE ADDRESS BAR
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}

// THIS IS A LISTENER FOR REQUESTS FROM CONTENT SCRIPTS THAT REQUIRE
// THE ADDRESS BAR URL OR DATA FROM STORAGE
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'getUrl') {

      // DISABLER /////////////////////////////////////////////////////////////////////////////
      // Tells content scripts to not kick off process if in disabled state
      /////////////////////////////////////////////////////////////////////////////////////////
      getDisabledState(function(isDisabled) {
        if (isDisabled) {
          sendResponse({disabled: 'Disabled State'});
      /////////////////////////////////////////////////////////////////////////////////////////
        } else {
          getCurrentTabUrl(function(tabUrl) {
            sendResponse({url: filterLinks(tabUrl)});
          });
        }
      })
    }
    if (request.action === 'checkUrl') {
      var url = request.url;
      getBlacklist(function(blackList) {
        getUserlist(function(userList) {
          getWhitelist(function(whiteList) {
            sendResponse(userList.concat(blackList)
              .filter(function(obj) { return whiteList.indexOf(obj) === -1; } )
              .reduce(function(pre, cur) {
                return cur.url === url ? { fake: true, urlObj: cur } : pre;
              }, {fake: false}));
          });
        });
      });
    }
    // allow for an asynchronoous response to alertFakeSite listener
    return true;
  }
);
