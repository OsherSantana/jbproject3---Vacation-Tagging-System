import { Router, Request, Response } from "express";

const testRouter = Router();

testRouter.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Test router works!' });
});

export default testRouter;