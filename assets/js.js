if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
      navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
          console.log('Registered!', registration.scope);
      }, function (err) {
          console.log('uh oh', err)
      });
  });
}

window.addEventListener('load', function () {
  var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
  var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
  var showImage = navigator.onLine ? 'none' : 'block';
  document.querySelector('.connection').innerHTML = condition;
  document.querySelector('.subcondition').innerHTML = subcondition;
  document.getElementById('showImage').style.display = showImage;
  document.getElementById('showVideo').style.display = showImage;

  function updateOnlineStatus(event) {

    var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
    var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
    var showImage = navigator.onLine ? 'none' : 'block';
    document.getElementById('showImage').style.display = showImage;
    document.getElementById('showVideo').style.display = showImage;
    document.querySelector('.connection').innerHTML = condition;
    document.querySelector('.subcondition').innerHTML = subcondition;
    console.log( 'network event!', condition);

  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

(function () {

  function triggerEvent(type) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(type, true, true);
    event.eventName = type;
    (document.body || window).dispatchEvent(event);
  }

  function testConnection() {
    // make sync-ajax request
    var xhr = new XMLHttpRequest();
    // phone home
    xhr.open('HEAD', '/', false); // async=false
    try {
      xhr.send();
      onLine = true;
    } catch (e) {
      // throws NETWORK_ERR when disconnected
      onLine = false;
    }

    return onLine;
  }

  var onLine = true,
    lastOnLineStatus = true;

  // note: this doesn't allow us to define a getter in Safari
  navigator.__defineGetter__("onLine", testConnection);
  testConnection();

  if (onLine === false) {
    lastOnLineStatus = false;
    // trigger offline event
    triggerEvent('offline');
  }

  setInterval(function () {
    testConnection();
    if (onLine !== lastOnLineStatus) {
      triggerEvent(onLine ? 'online' : 'offline');
      lastOnLineStatus = onLine;
    }
  }, 5000); // 5 seconds, made up - can't find docs to suggest interval time
})();
//ie app cache
var sCacheStatus = "Not supported";
if (window.applicationCache)
{
   var oAppCache = window.applicationCache;
   switch ( oAppCache.status )
   {
      case oAppCache.UNCACHED :
         sCacheStatus = "Not cached";
         break;
      case oAppCache.IDLE :
         sCacheStatus = "Idle";
         break;
      case oAppCache.CHECKING :
         sCacheStatus = "Checking";
         break;
      case oAppCache.DOWNLOADING :
         sCacheStatus = "Downloading";
         break;
      case oAppCache.UPDATEREADY :
         sCacheStatus = "Update ready";
         break;
      case oAppCache.OBSOLETE :
         sCacheStatus = "Obsolete";
         break;
      default :
        sCacheStatus = "Unexpected Status ( " +
                       oAppCache.status.toString() + ")";
        break;
   }
}

function testConnection() {
  // make sync-ajax request
  var xhr = new XMLHttpRequest();
  // phone home
  xhr.open('HEAD', '/favicon.ico', false); // async=false
  try {
    xhr.send();
    onLine = true;
  } catch (e) {
    // throws NETWORK_ERR when disconnected
    onLine = false;
  }

  return onLine;
}

