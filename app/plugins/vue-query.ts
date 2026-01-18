import { VueQueryPlugin, QueryClient, dehydrate, hydrate } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient();

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient });

  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      nuxtApp.payload.state.vueQueryState = dehydrate(queryClient);
    });
  }

  if (import.meta.client) {
    hydrate(queryClient, nuxtApp.payload.state.vueQueryState);
  }

  return {
    provide: {
      queryClient,
    },
  };
});

