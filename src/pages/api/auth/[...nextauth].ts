import { SimpleIdServerProvider } from '@/constants/auth';
import axios from 'axios';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;

      try {
        const { data: userinfo } = await axios.get(
          `${process.env.SIDSERVER_URL}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );
        session.user = userinfo;
      } catch (error) {
        console.log('error en session', error);
      }

      return session;
    },
  },
  providers: [
    {
      id: SimpleIdServerProvider,
      name: 'SimpleIdServer',
      type: 'oauth',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      client: { token_endpoint_auth_method: 'client_secret_post' },
      wellKnown: `${process.env.SIDSERVER_URL}/.well-known/openid-configuration`,
      authorization: { params: { scope: process.env.SCOPE } },
      checks: ['pkce', 'state'],
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role,
        };
      },
    },
  ],
};

export default NextAuth(authOptions);
