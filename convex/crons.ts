import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.interval(
    "run-coffee-mentions",
    { seconds: 30 }, // Adjust based on your needs
    api.session.runScheduledTasks
);

export default crons;