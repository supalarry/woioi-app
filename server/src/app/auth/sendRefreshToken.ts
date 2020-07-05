import { Response } from 'express';


export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('lau', token,
    {
        httpOnly: true,
        expires: new Date(Date.now() + 604800)
    });
}