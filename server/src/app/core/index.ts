import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { createSchema } from '../../utils/createSchema';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import { User } from '../../entity/User';
import { createAccessToken, createRefreshToken } from '../auth/auth';
import { sendRefreshToken } from '../auth/sendRefreshToken';

const port = 3000;

(async () => {
    const app = express();
    app.use(cors({
        origin: 'http://localhost:8080',
        credentials: true,
    }));
    app.use(cookieParser());
    /* For whatever security reasons graphql wont handle this */
    /* This works when user has refresh token in cookie but needs to
    refresh access token used to access graphql queries and mutation */
    app.post('/refreshToken', async (req, res) => {
        const token: string = req.cookies.lau;

        if (!token) {
            return res.send({ok: false, accessToken: ''});
        } 
        let payload: any;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, accessToken: '' });
        }
        
        const user = await User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ok: false, accessToken: ''});
        }
        
        /* refresh token is invalid if version it has in payload does not
        match the one user has in database */
        if (user!.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ''});
        }

        sendRefreshToken(res, await createRefreshToken(user!));
        return res.send({ ok: true, accessToken: await createAccessToken(user!) });
    });

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({ req, res }) => ({ req, res })
        /* make req and res available in graphql resolvers */
    });

    apolloServer.applyMiddleware({ app, cors: false });
    
    await createConnection();
    
    app.listen(port, () => {
        console.log(`Listening at port ${port}`);
    });
})()

