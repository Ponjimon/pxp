import { LoaderFunction } from '../../../models/remix';

export const loader: LoaderFunction = ({ request, params, context }) => {
  if (!params.provider) {
    throw new Error('Missing provider');
  }

  return context.authenticator.authenticate(params.provider, request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};
