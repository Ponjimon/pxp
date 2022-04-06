import { Form } from 'remix';
import { SocialsProvider } from 'remix-auth-socials';

export type SocialButtonProps = {
  provider: SocialsProvider;
  label: string;
};

const SocialButton: React.FC<SocialButtonProps> = ({ provider, label }) => (
  <Form action={`/auth/${provider}`} method="post">
    <button>{label}</button>
  </Form>
);

export default SocialButton;
