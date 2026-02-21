// Clear Development Cache Script
// Run this in browser console if you still have caching issues in development

console.log('🧹 Clearing development cache...');

// Clear all browser caches
if ('caches' in window) {
  caches.keys().then(function(names) {
    names.forEach(function(name) {
      caches.delete(name);
      console.log('✅ Deleted cache:', name);
    });
  });
}

// Clear service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (let registration of registrations) {
      registration.unregister();
      console.log('✅ Unregistered service worker');
    }
  });
}

// Clear local storage
localStorage.clear();
console.log('✅ Cleared localStorage');

// Clear session storage  
sessionStorage.clear();
console.log('✅ Cleared sessionStorage');

// Force reload without cache
console.log('🔄 Force reloading page...');
window.location.reload(true);