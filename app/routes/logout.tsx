import { ActionFunction } from '../../models/remix';

export const action: ActionFunction = async ({ request, context }) => {
  await context.authenticator.logout(request, { redirectTo: '/' });
};
