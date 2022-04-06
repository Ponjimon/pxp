import { SocialsProvider } from 'remix-auth-socials';
import SocialButton from '../components/SocialButton';

export default function Login() {
  return (
    <>
      <SocialButton
        label="Login with Discord"
        provider={SocialsProvider.DISCORD}
      />
    </>
  );
}
