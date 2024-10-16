// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ["bootstrap/dist/css/bootstrap.min.css", "@fortawesome/fontawesome-free/css/all.min.css"],

  modules: ["@nuxtjs/supabase"],
  supabase: { redirect: false },
  app: {
    head: {
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2/dist/js/bootstrap.bundle.min.js'}
      ]
    }
  },
})
