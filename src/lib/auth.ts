import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
          scope: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/calendar',
            // and more scope urls
          ].join(' '),
          response: 'code',
        },
      },
    }),
  ],
  
  callbacks: {

    async jwt({ token, user , account }) {
      //Initial sign in
      
     if(account && user){
      return {
        accessToken: account.access_token,
        accessTokenExpires: account.expires_in,
        refreshToken: account.refresh_token,
        idToken: account.id_token,
        user,
      }
     }


      const dbUser = await db.user.findFirst({
        where: {
          email: token.email!,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        token,
      }
    },


     async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
        session.accessToken= token.user
        session.idToken= token.idToken
        session.refreshToken= token.refreshToken

      }

      return session
    },

    
    redirect() {
        console.log("redirect triggered")
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)