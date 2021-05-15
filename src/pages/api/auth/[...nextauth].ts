import { query } from 'faunadb';

import NextAuth from 'next-auth'

import Providers from 'next-auth/providers'

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      const { email } = user;
   
      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(email as string)
                )
              )
            ),
            query.Create(
              query.Collection('users'), 
              { data: { email } }
            ),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(email as string)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    }
  }
})