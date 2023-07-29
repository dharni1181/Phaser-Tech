import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDB} from '@utils/database'
import User from '@models/user';
// require ('.env')
const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        GoogleProvider({
            clientId:'341188300776-ba2tqe3aiqbkk9up7mqlc1l1jgn11uer.apps.googleusercontent.com',
            clientSecret:'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',
         })

    ],
    callbacks:{

    async session({session}){
        const sessionUser = await User.findOne({
            email:session.user.email
         })
         
          session.user.id = sessionUser._id.toString();
         return session
          
    },
    async signIn({profile}){
         try{
            await connectToDB();
            
            const userExists =  await User.findOne({
                email:profile.email
            });

            if(!userExists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").
                    toLowerCase(),
                    image:profile.picture 
                });
            }



            return true;

        }catch(error){
           console.log(error);
           return false;
        }

    }
},
})

export {handler as GET , handler as POST };