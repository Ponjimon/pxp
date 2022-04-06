import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';
import { createCloudflareKVSessionStorage } from 'remix';
import { Authenticator } from 'remix-auth';
import { DiscordStrategy } from 'remix-auth-socials';

// @ts-ignore
import * as build from '../build';
import { User } from '../models/remix';

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext: context => {
    if (!context.env.SESSION_SECRET) {
      throw new Error('SESSION_SECRET environment variable is not set');
    }
    const sessionStorage = createCloudflareKVSessionStorage({
      cookie: {
        name: '_session',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secrets: [context.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production',
      },
      kv: context.env.sessionStorage,
    });

    const authenticator = new Authenticator<User>(sessionStorage);
    authenticator.use(
      new DiscordStrategy(
        {
          clientID: context.env.DISCORD_CLIENT_ID,
          clientSecret: context.env.DISCORD_CLIENT_SECRET,
          callbackURL: context.env.DISCORD_REDIRECT_URL,
        },
        async ({ profile }) => {
          const {
            id,
            __json: { username, discriminator, avatar },
          } = profile;

          return { id, username: `${username}#${discriminator}`, avatar };
        }
      )
    );

    return { ...context, sessionStorage, authenticator };
  },
});

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context);
}
