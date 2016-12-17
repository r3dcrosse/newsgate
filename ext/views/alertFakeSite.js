// THIS IS A CONTEXT SCRIPT THAT WILL RENDER AN ALERT BANNER
// IF CALLED BY checkUrlContentScript.js
console.log('Running alertFakeSite.js');

// Function to add alert popup message to DOM
function alertFakeSite(type) {
  var alertInfo = getAlertMessageBasedOn(type);

  $('body').prepend(
    '<div class="' + alertInfo.divClass + '"><p class="'
    + alertInfo.closeClass + '">close</p><p class="'
    + alertInfo.alertClass + '">'
    + alertInfo.msg + '</p></div>');

  $('.fake-site-popup').click(function() {
    $('.fake-site-popup').hide();
  });
};

// Helper function, returns object with appropriate alert message info
function getAlertMessageBasedOn(type) {
  switch (type) {
    ////////////////////////////////////////////////////////////////////////////
    // FAKE SITE
    ////////////////////////////////////////////////////////////////////////////
    case 'fake ':
    case 'fake':
    case 'clickbait ':
    case 'clickbait':
    case 'fake, conspiracy':
    case 'bias, fake':
      return {
        msg: 'NewsGate has reason to believe this is a fake site',
        divClass: 'fake-site-popup',
        alertClass: 'fake-site-alert',
        closeClass: 'fake-site-close'
      };

    ////////////////////////////////////////////////////////////////////////////
    // SATIRE SITE
    ////////////////////////////////////////////////////////////////////////////
    case 'satire':
    case 'rumor':
    case 'parody':
      return {
        msg: 'Newsgate has reason to believe this is a satirical site',
        divClass: 'satire-site-popup',
        alertClass: 'fake-site-alert',
        closeClass: 'fake-site-close'
      };

    ////////////////////////////////////////////////////////////////////////////
    // BIASED SITE
    ////////////////////////////////////////////////////////////////////////////
    case "conspiracy ":
    case "conspiracy":
    case "conpisracy":
    case "conpsiracy":
    case "conpiracy":
    case "unreliable ":
    case "unreliable":
    case "bias":
    case "credible":
    case "hate":
    case "junksci":
    case "political":
    case "rumors":
      return {
        msg: 'NewsGate has reason to believe this is an unreliable or biased site',
        divClass: 'biased-site-popup',
        alertClass: 'biased-site-alert',
        closeClass: 'biased-site-close'
      };

    ////////////////////////////////////////////////////////////////////////////
    // DEFAULT CASE
    ////////////////////////////////////////////////////////////////////////////
    default:
      return {
        msg: 'NewsGate has reason to believe this is a fake site',
        divClass: 'fake-site-popup',
        alertClass: 'fake-site-alert',
        closeClass: 'fake-site-close'
      };
  };
};
