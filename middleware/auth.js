import axios from "axios";
import { firebaseAdmin } from "./../auth/firebase";

export default (req, res, next) => {
  const sessionCookie = req.cookies.session || "";
  firebaseAdmin
    .auth()
    .verifySessionCookie(sessionCookie, true)
    .then((decodedClaims) => {
      req.headers["X-Hasura-Role"] = "user";
      req.headers["X-Hasura-User-Id"] = decodedClaims.user_id;

      axios
        .post(
          "http://localhost:8080/v1/graphql",
          {
            query: `query getUserId {
					users {
						id
						name
						email
					}
				}
				`,
          },
          {
            headers: req.headers,
          }
        )
        .then((response) => {
          req.user = response.data.data.users[0];
          req.headers["X-Hasura-User-Id"] = req.user.id;
          next();
        });
    })
    .catch((error) => {
      console.error({
        errorCode: error.code,
        error: error.message,
      });
      res.redirect("/login");
    });
};
