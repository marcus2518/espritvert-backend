import * as firebase from 'firebase-admin';
import { NextFunction, Request, Response } from 'express';

export interface IGetAuthTokenRequest extends Request {
    authToken?: string | null;
    authId?: string;
}

const getAuthToken = (req: IGetAuthTokenRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {
        req.authToken = null;
    }
    next();
};

export const checkIfAuthenticated = (
    req: IGetAuthTokenRequest,
    res: Response,
    next: NextFunction
) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            if (!authToken) {
                return res.status(401).send({ error: 'No auth token provided' });
            }

            const userInfo = await firebase.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res.status(401).send({ error: 'You are not authorized to make this request' });
        }
    });
};

export const checkIfAdmin = (req: IGetAuthTokenRequest, res: Response, next: NextFunction) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            if (!authToken) {
                return res.status(401).send({ error: 'No auth token provided' });
            }

            const userInfo = await firebase.auth().verifyIdToken(authToken);
            if (userInfo.admin === true) {
                req.authId = userInfo.uid;
                return next();
            } else {
                return res.status(403).send({ error: 'Admin privileges required' });
            }
        } catch (e) {
            return res.status(401).send({ error: 'You are not authorized to make this request' });
        }
    });
};
