const { Router } = require("express");
const router = Router();
const {
  adminRegistration,
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/controllers");
const auth = require("../middleware/auth");
router.post("/admin", adminRegistration);
router.post("/createUser",auth,createUser);
router.get("/getAllUser", auth, getAllUser);
router.get("/getUser/:id", auth, getUser);
router.put("/updateUser/:id", auth, updateUser);
router.delete("/deleteUser/:id", auth, deleteUser);
module.exports = router;
