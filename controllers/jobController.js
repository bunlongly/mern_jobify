import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";



export const getAllJobs = async (req, res) => {
  // console.log(req)
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// export const getJob = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const job = await Job.findById(id);
//     if (!job) {
//       throw new NotFoundError(`No job with id: ${id}`);
//     }

//     res.status(StatusCodes.OK).json({ job });
//   } catch (error) {
//     if (error instanceof mongoose.Error.CastError) {
//       return next(new NotFoundError(`No job with id: ${id}`));
//     }
//     next(error); // Forward other types of errors to your error handling middleware
//   }
// };

export const getJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ job: removedJob });
};
