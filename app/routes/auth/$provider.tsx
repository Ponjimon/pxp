import { redirect } from 'remix';
import { ActionFunction, LoaderFunction } from '../../../models/remix';

export const loader: LoaderFunction = () => redirect('/login');
export const action: ActionFunction = ({ request, params, context }) => {
  if (!params.provider) {
    throw new Error('Missing provider');
  }

  return context.authenticator.authenticate(params.provider, request);
};
