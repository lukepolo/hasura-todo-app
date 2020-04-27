import express from "express";
import jsonwebtoken from "jsonwebtoken";
const router = express.Router();

router.get("/hasura-webhook", (req, res) => {
  let jwt = req.headers.authorization.replace("Bearer : ", "");

  try {
  	// TODO - you should never store secrets :-), DEMO ONLY
    let { user_id, role } = jsonwebtoken.verify(jwt, "my-secret");
    return res.json({
      "X-Hasura-Role": role,
      "X-Hasura-User-Id": `${user_id}`,
    });
  } catch (e) {
    res.status(401).send("Not Authorized.");
  }
});

export default router;
