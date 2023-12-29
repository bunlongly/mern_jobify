import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "google", position: "backend" },
];

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "data received", data: req.body });
});

app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});


//Get All Jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});


//Create Job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide company and position" });
  }
  const id = nanoid(10);
  // console.log(id);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job });
});


// GET SINGLE JOB

app.get("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
});

const port = process.env.PORT || 5200;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}....`);
});
