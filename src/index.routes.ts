import { Router } from "express";
import { login, logout, refreshToken, register } from "./controllers/v1/Auth/auth.controller";
import { authenticateJWT } from "./middleware/authenticateJWT";
import { authorizeRole } from "./middleware/authorizeRole";
import { addCourt, getCourts } from "./controllers/v1/courts.controller";
import { upload } from "./helpers/uploadFile";
import { addCompetition } from "./controllers/v1/competitions.controller";
import { getBookingStatus, getCompetitionStatus, getCompetitionType, getMatchEventType } from "./controllers/shared.controller";

const router: Router = Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get("/refresh-token", refreshToken);

//SHARED ROUTES
router.get("/booking-status", getBookingStatus);
router.get("/competition-status", getCompetitionStatus);
router.get("/competition-type", getCompetitionType);
router.get("/match-event-type", getMatchEventType);

//OWNER ROUTES
router.post("/courts/add", authenticateJWT, authorizeRole("OWNER"),
    upload({ folderName: "courts" }).single("image"), addCourt);
router.get("/courts", authenticateJWT, authorizeRole("OWNER"), getCourts);

//HOST ROUTE
router.post("/competitions/add", authenticateJWT, authorizeRole("HOST"), addCompetition);

export default router;
