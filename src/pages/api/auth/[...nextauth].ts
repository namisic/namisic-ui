import { AuthOptions, Profile } from 'next-auth';
import NextAuth from 'next-auth/next';

export const authOptions: AuthOptions = {
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
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  providers: [
    {
      id: 'simpleidserver',
      name: 'SimpleIdServer',
      type: 'oauth',
      wellKnown: `${process.env.NEXTAUTH_URL}/.well-known/openid-configuration`,
      authorization: { params: { scope: process.env.SCOPE } },
      idToken: false,
      checks: ['pkce', 'state'],
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
