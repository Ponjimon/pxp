import { CacheProvider } from '@emotion/react';
import { useCallback, useState } from 'react';
import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import ClientStyleContext from './styles/client.context';
import createEmotionCache from './styles/createEmotionCache';

type ClientCacheProviderProps = {
  children: React.ReactNode;
};

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const reset = useCallback(() => {
    setCache(createEmotionCache());
  }, []);

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
