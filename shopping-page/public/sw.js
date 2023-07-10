self.addEventListener("install",()=>{
    console.log("Service worker installed");
    self.skipWaiting()
    caches.open("veema")
    .then(cache=>{
        console.log("cache done");
        cache.addAll([
            "/",
            "/index.html",
            "/manifest.json",
            "http://localhost:3000/static/media/GreatVibes-Regular.6d246c3b51d7eb58b13a.ttf",
            "http://localhost:3000/static/media/Vazir-Medium.af420e7a5eb573a1944e.ttf",
            "https://fakestoreapi.com/products",
            "/assets/icons/icon-144x144.png",
            "/static/js/bundle.js",
        ])
    }).then(()=>{
        console.log("files cached successfully");
    }).catch((err)=>{
        console.log("Caching failed:",err);
    })
})
self.addEventListener("activate",()=>{
    console.log("Serivce worker activated");
})
self.addEventListener("fetch",(event)=>{
    event.respondWith(caches.match(event.request)
    .then(response=>{
        if (response) {
            return response
        } else {
            return fetch(event.request)
        }
    }))
})