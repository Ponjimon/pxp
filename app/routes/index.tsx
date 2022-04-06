import { useLoaderData } from 'remix';
import { SocialsProvider } from 'remix-auth-socials';
import { LoaderFunction, User } from '../../models/remix';
import Canvas from '../components/Canvas';
import SocialButton from '../components/SocialButton';

export const loader: LoaderFunction = async ({ context, request }) => {
  const user = await context.authenticator.isAuthenticated(request);

  return { user };
};

export default function Index() {
  const { user } = useLoaderData<{ user: User | null }>();

  return user ? (
    <>
      <div>Hi, {user.username}!</div>
      <Canvas />
    </>
  ) : (
    <SocialButton
      label="Login with Discord"
      provider={SocialsProvider.DISCORD}
    />
  );
}
