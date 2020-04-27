import { firebaseAdmin } from "./../auth/firebase";

export default function (user, res) {
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  return user.getIdToken().then((idToken) => {
    return firebaseAdmin
      .auth()
      .createSessionCookie(idToken, {
        expiresIn,
      })
      .then(
        (sessionCookie) => {
          // TODO - secure should be an .env
          res.cookie("session", sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: false,
          });
          return res;
        },
        (error) => {
          res.status(401).send(error);
        }
      );
  });
}
