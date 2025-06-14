import jwt from 'jsonwebtoken';
import { createError } from './error.js';


// Middleware to verify the token
// This middleware checks if the user is authenticated by verifying the JWT token
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated!"));
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
}

// Middleware to verify if the user is authorized
// This middleware checks if the user is authorized to perform certain actions

export const verifyUser = (req, res, next) => {
    // first verify the token or user
    verifyToken(req, res, next,() => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};


// Middleware to verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
    // first verify the token or user
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized as admin!"));
        }
    });
};