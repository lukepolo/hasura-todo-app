import axios from "axios";
import express from "express";
import authMiddleware from "./../middleware/auth";

let router = express.Router();

router.use("/api", authMiddleware);

router.get("/api/me", (req, res) => {
  res.send(req.user);
});

router.post("/api/notes", (req, res) => {
  axios
    .post("http://localhost:8080/v1/graphql", {
      query: `
						mutation {
							insert_todos(
								objects : [
									{
										user_id : ${req.user.id},
										todo : "${req.body.todo}"
									}
								]
							) {
								returning {
									id,
									todo
								}
							}
						}
					`,
    })
    .then((response) => {
      res.send(response.data.data);
    });
});

router.get("/api/notes", (req, res) => {
  axios
    .post(
      "http://localhost:8080/v1/graphql",
      {
        query: `query getTodos {
					todos {
						id
						todo
						created_at
						updated_at
						user_id
					}
				}
				`,
      },
      {
        headers: req.headers,
      }
    )
    .then((response) => {
      res.send(response.data.data);
    });
});

export default router;
