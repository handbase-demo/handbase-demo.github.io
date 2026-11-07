// « Nextar a déménagé » : REMPLACE le service worker de l'ancienne appli (même nom, sw.js). Le navigateur l'installe à sa
// prochaine vérification de mise à jour ; il s'active tout de suite, vide les caches de l'ancienne appli, se désinscrit et
// recharge les pages ouvertes, qui affichent alors la page de déménagement (plus d'appli hors ligne sur l'ancienne adresse,
// donc plus d'écriture vers l'ancien serveur).
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const cle of await caches.keys()) await caches.delete(cle)
      await self.registration.unregister()
      for (const page of await self.clients.matchAll({ type: 'window' })) page.navigate(page.url)
    })(),
  )
})
