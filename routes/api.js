import axios from "axios";
import express from "express";

let router = express.Router();

router.get("/api/me", (req, res) => {
  axios
    .post(
      "http://localhost:8080/v1/graphql",
      {
        query: `query MyQuery {
					users {
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
      res.send(response?.data?.data?.users[0]);
    });
});

router.get("/api/settings", (req, res) => {
  axios
    .post(
      "http://localhost:8080/v1/graphql",
      {
        query: `query GetSettings {
					settings {
						setting
						value
					}
				}
			`,
      },
      {
        headers: req.headers,
      }
    )
    .then((response) => {
      res.send(response?.data?.data);
    });
});

export default router;
