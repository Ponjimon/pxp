import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import type { MetaFunction } from 'remix';
import { withEmotionCache } from '@emotion/react';
import styled from '@emotion/styled';
import { useContext, useEffect } from 'react';
import ServerStyleContext from './styles/server.context';
import ClientStyleContext from './styles/client.context';

const Container = styled('div')`
  background-color: #ff0000;
  padding: 1em;
`;

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' };
};

type DocumentProps = {
  children: React.ReactNode;
  title?: string;
};

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;

      // re-inject tags
      const { tags } = emotionCache.sheet;
      emotionCache.sheet.flush();
      tags.forEach(tag => {
        (emotionCache.sheet as any)._insertTag(tag);
      });

      // reset cache to re-apply global styles
      clientStyleData.reset();
    }, [clientStyleData, emotionCache.sheet]);

    return (
      <html lang="en">
        <head>
          {title ? <title>{title}</title> : null}
          <meta charSet="utf-8" />
          <meta content="width=device-width,initial-scale=1" name="viewport" />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              dangerouslySetInnerHTML={{ __html: css }}
              // eslint-disable-next-line react/no-danger
              data-emotion={`${key} ${ids.join(' ')}`}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Container>
        <p>
          [CatchBoundary]: {caught.status} {caught.statusText}
        </p>
      </Container>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <Container>
        <p>[ErrorBoundary]: There was an error: {error.message}</p>
      </Container>
    </Document>
  );
}
