import axios from "axios";
import express from "express";
import { firebase } from "./../auth/firebase";
import setAuthSession from "./../auth/setAuthSession";

const router = express.Router();

router.post("/register", (req, res) => {
  let { email, password } = req.body;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      res.status(error.code).send(error.message);
    })
    .then((response) => {
      let user = response.user;
      axios
        .post("http://localhost:8080/v1/graphql", {
          query: `
						mutation {
							insert_users(
								objects : [
									{
										user_id : "${response.user.uid}"
										name : "${response.user.displayName}"
										email : "${response.user.email}"
									}
								]
							) {
								returning {
									id
								}
							}
						}
					`,
        })
        .then(() => {
          setAuthSession(user, res).then(() => {
            res.end();
          });
        });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      res.status(error.code).send(error.message);
    });
});

export default router;
