import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from 'type-graphql';
import { User } from '../entity/User';
import { AppContext } from '../interfaces/AppContext';
import { createAccessToken } from '../app/auth/auth';
import { sendRefreshToken } from '../app/auth/sendRefreshToken'
import { UserRepository } from '../repositories/UserRepository';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {
    userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }

    @Mutation(() => LoginResponse)
    async register(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('mainLang') mainLang: string,
        @Arg('password') password: string,
        @Ctx() { res }: AppContext): Promise<LoginResponse>
    {
        const user = await this.userRepository.register(email, username, mainLang, password, res);   
        const accessToken = await createAccessToken(user);
        return {
            accessToken,
            user
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: AppContext): Promise<LoginResponse>
    {
        const user = await this.userRepository.login(email, password, res);
        const accessToken = await createAccessToken(user);
        return {
            accessToken,
            user
        }
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokenForUser(
        @Arg('userId', () => Int) userId: number): Promise<Boolean>
    {
        const performed = await this.userRepository.revokeRefreshTokenForUser(userId);
        return (performed);
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: AppContext){
        sendRefreshToken(res, '');
        return true;
    }
}