/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app/src/api/api-base.js","4a0bebc926b9874d8390a204a893e1be"],["app/src/api/api-base.js.map","24eceaadc3f2ee5da6b17fe510816a00"],["app/src/api/http/http-client-factory.js","8245623bbbf0e981fd4b642650c955b5"],["app/src/api/http/http-client-factory.js.map","fda9fd82700abc0a5eb6ddcef282e422"],["app/src/api/onkey-api.js","788900d75418e58940d4ecb16eb23cbf"],["app/src/api/onkey-api.js.map","bb87d00b2f71e8a1ca05ce0d94c9fb59"],["app/src/api/resources/resource-actions.js","f4598938f5358b8d76637f13022151d3"],["app/src/api/resources/resource-actions.js.map","0c982ecb2f15323fc81b87eeebb6f51d"],["app/src/api/resources/resource-api.js","8a9d843131443388f17fa2a9b336ce90"],["app/src/api/resources/resource-api.js.map","46833caaf3606c82eef0b5baa0ccbf36"],["app/src/api/resources/resource-metadata-cache.js","f3ae2b7f2616d4612f6ab149cffadaf8"],["app/src/api/resources/resource-metadata-cache.js.map","4f387c7108538869074c4d6ba308f24d"],["app/src/app.html","5dbbb5694e03c751a6dbe6da0f30c7fe"],["app/src/app.js","9eee88b47b43c32f3d96e837bdc7ae08"],["app/src/app.js.map","cee2398ec0ac231b815263b8854f0780"],["app/src/index.js","fb036c233f0213bd25a7b87805897285"],["app/src/index.js.map","c9769d1b3ef4461e6a74a793d6ac3439"],["app/src/main.js","7d032aa3c50128d551531dad285ad5e0"],["app/src/main.js.map","7a0dbc7b6425985554d07ccda649877e"],["app/src/vendor-build.js","4b1e5b30eb0c2ca1862ac501956caf43"],["app/src/views/navigation-routes.js","4b5a726c0a440994090a512225e1d459"],["app/src/views/navigation-routes.js.map","a2d01564712693a0ff99d737b3bb833d"],["app/src/views/resource-list/resource-list.html","c99213f126a8145a6487b87f7f3d96c8"],["app/src/views/resource-list/resource-list.js","e30643b9e02620da2694a704c3e334eb"],["app/src/views/resource-list/resource-list.js.map","9afee61491eeead700aeba0a643f0beb"],["app/src/views/resource/resource.html","89129190140af89d0f9678d0c7dbf9d0"],["app/src/views/resource/resource.js","69c384e175dc5b1196ad0254c8c769f7"],["app/src/views/resource/resource.js.map","b91322a0dca9c967c18fc34ebca4065b"],["app/src/views/resources/resources.html","5f6fcf923137e3d81e0c01747f8ef0db"],["app/src/views/resources/resources.js","17812f87be7aa6d0584cf3561cc9825b"],["app/src/views/resources/resources.js.map","47768e81504b689876f1c27dfb53e22b"],["app/src/views/view-base.js","88651484f9c41fb18ece9d942b126153"],["app/src/views/view-base.js.map","2ee0f6d0dca13a81d2c38922b771326e"],["app/src/views/welcome/welcome.html","7f0d7f9a0d67ac20d27dab41ec3f6b63"],["app/src/views/welcome/welcome.js","ab99528c8f2687465b302b6bc4192aa1"],["app/src/views/welcome/welcome.js.map","df0702ba5f80d845dc46e53c31ddaa25"],["config.js","1e77a2d341144f144917d4a3fcaacf31"],["images/app.svg","c91b40bf4094f2a92c683600b49d58fc"],["index.html","2083ac80e4c77a80899fbf65136faef4"],["jspm_packages/system.js","eccc019329febb5a1b06bde008ca5614"],["styles/normalize.css","761126c20e2413ab7c7126cca83d9f22"],["styles/style.css","01e87b59fbde3a591c33d65a4a676e61"]];
var cacheName = 'sw-precache-v3-untitled-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







