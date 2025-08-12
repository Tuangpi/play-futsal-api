import { Router } from "express";
import { login, logout, refreshToken, register } from "./controllers/v1/Auth/auth.controller";
import { authenticateJWT } from "./middleware/authenticateJWT";
import { authorizeRole } from "./middleware/authorizeRole";

const router: Router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get("/refresh-token", refreshToken);

router.get("/profile", authenticateJWT, (req, res) => {
    res.json({ message: `Welcome ${JSON.stringify(req)}` });
});

router.get("/owner-only", authenticateJWT, authorizeRole("OWNER"), (req, res) => {
    res.json({ message: "Only owners can see this" });
});


export default router;
