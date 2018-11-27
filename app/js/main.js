var showImage = navigator.onLine ? 'none' : 'block';
var hideContent = navigator.onLine ? 'block' : 'none';
var showImage = navigator.onLine ? 'none' : 'block';
window.addEventListener('load', function () {
  var showImage = navigator.onLine ? 'none' : 'block';
  var hideContent = navigator.onLine ? 'block' : 'none';
  function updateOnlineStatus(event) {
    var showImage = navigator.onLine ? 'none' : 'block';
    document.getElementById('showImage').style.display = showImage;

  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  var showImage = navigator.onLine ? 'none' : 'block';
  var hideContent = navigator.onLine ? 'block' : 'none';

  function updateOnlineStatus(event) {
    var hideContent = navigator.onLine ? 'block' : 'none';
    var showImage = navigator.onLine ? 'none' : 'block';
    document.getElementById('showVideo').style.display = showImage;
    document.getElementById('hideContent').style.display = hideContent;
    console.log('network event!', showImage);
    console.log(navigator.onLine)


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
    // Make sync-AJAX request.
    var xhr = new XMLHttpRequest();

    // Phone home.
    xhr.open('HEAD', 'https://www.google.com/', false); // async=false
    try {
      xhr.send();
      onLine = true;
    } catch (e) {
      // Throws NETWORK_ERR when disconnected.
      onLine = false;
    }

    return onLine;
  }


  var lastOnLineStatus = true;

  // Note: this doesn't allow us to define a getter in Safari.
  navigator.__defineGetter__('onLine', testConnection);
  testConnection();

  if (onLine === false) {
    lastOnLineStatus = false;
    // Trigger offline event.
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
// var sCacheStatus = "Not supported";
// if (window.applicationCache) {
//   var oAppCache = window.applicationCache;
//   switch (oAppCache.status) {
//     case oAppCache.UNCACHED:
//       sCacheStatus = "Not cached";
//       break;
//     case oAppCache.IDLE:
//       sCacheStatus = "Idle";
//       break;
//     case oAppCache.CHECKING:
//       sCacheStatus = "Checking";
//       break;
//     case oAppCache.DOWNLOADING:
//       sCacheStatus = "Downloading";
//       break;
//     case oAppCache.UPDATEREADY:
//       sCacheStatus = "Update ready";
//       break;
//     case oAppCache.OBSOLETE:
//       sCacheStatus = "Obsolete";
//       break;
//     default:
//       sCacheStatus = "Unexpected Status ( " +
//         oAppCache.status.toString() + ")";
//       break;
//   }
// }
