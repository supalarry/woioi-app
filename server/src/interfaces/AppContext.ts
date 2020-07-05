import { Request, Response } from 'express';

/* we make it so typescript can know the type of Request and Response and where
we use this interface to know properties and methods of req and res */
export interface AppContext {
    req: Request,
    res: Response,
    payload?: { userId: string }
}