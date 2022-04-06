import { AppData, SessionStorage } from 'remix';
import { Authenticator } from 'remix-auth';
import type { Params } from 'react-router-dom';

export type User = {
  id: string;
  username: string;
  avatar: string | null;
};

export type LoadContext = EventContext<
  {
    TWITTER_CLIENT_ID: string;
    TWITTER_CLIENT_SECRET: string;
    TWITTER_CALLBACK_URL: string;
  },
  any,
  any
> & {
  authenticator: Authenticator<User>;
  sessionStorage: SessionStorage;
};

type DataFunctionArgs = {
  request: Request;
  context: LoadContext;
  params: Params;
};

export type ActionFunction = {
  (args: DataFunctionArgs):
    | Promise<Response>
    | Response
    | Promise<AppData>
    | AppData;
};

export type LoaderFunction = {
  (args: DataFunctionArgs):
    | Promise<Response>
    | Response
    | Promise<AppData>
    | AppData;
};
