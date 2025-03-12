import { Router, Request, Response } from "express";
import { login, register } from "../controllers/auth/controller";
import validation from "../middlewares/validation";
import { loginValidator, registerValidator } from "../controllers/auth/validator";

const authRouter = Router();

// Add this simple POST test route
authRouter.post('/test-post', (req: Request, res: Response) => {
    res.json({ message: 'POST test works!' });
});
// Test route that just echoes the request body
authRouter.post('/echo', (req: Request, res: Response) => {
    console.log('Echo endpoint, body received:', req.body);
    res.json({
        message: 'Request body received',
        receivedBody: req.body
    });
});

// Explicitly type req and res parameters
authRouter.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Auth router works!' });
});

authRouter.post('/register', validation(registerValidator), register);
authRouter.post('/login', validation(loginValidator), login);

export default authRouter;