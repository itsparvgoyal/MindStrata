const { Worker } = require("bullmq");
const redisConnection = require("../config/redis");
const SubSection = require("../models/SubSection");


const { generateLectureSummary, } = require("../utilis/geminiServices");


const summaryWorker = new Worker(
    "lecture-summary",

    async (job) => {

        const {subSectionId} = job.data;
        console.log(`Processing summary job: ${job.id}`);

        // get subsection 
        const subsection = await SubSection.findById(subSectionId);

        if (!subsection) {
            throw new Error("SubSection not found");
        }


        // mark processing

        await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                summaryStatus: "PROCESSING",
                summaryError: null,
                questionsStatus: "PROCESSING",
                questionsError: null,
            }
        );


        try {
            // generate summary and quiz
            const { summary, questions } = await generateLectureSummary(subsection.videoUrl, subsection.description);

            // save summary and quiz
            await SubSection.findByIdAndUpdate(
                subSectionId,
                {
                    summary,
                    summaryStatus: "COMPLETED",
                    summaryGeneratedAt: new Date(),
                    summaryError: null,
                    extractedQuestions: questions,
                    questionsStatus: "COMPLETED",
                    questionsGeneratedAt: new Date(),
                    questionsError: null,
                }
            );

            console.log(`Summary completed: ${subSectionId}`);
            return {
                success: true,
                subSectionId,
            };

        } catch (error) {
            console.error(`Summary failed: ${subSectionId}`, error);

            // note:
            // don't permanently mark failed here
            // kya pta bullmq abhi wapis retry kre job.

            await SubSection.findByIdAndUpdate(
                subSectionId,
                {
                    summaryStatus: "PENDING",
                    summaryError: error.message,
                    questionsStatus: "PENDING",
                    questionsError: error.message,
                }
            );


            // throw error to bullmq taki pta chale kam fail ho gya 
            throw error;
        }
    },

    {
        connection: redisConnection,
        concurrency: 1,
    }
);


summaryWorker.on(
    "completed",
    (job) => {
        console.log(`Job ${job.id} completed`);
    }
);


summaryWorker.on(
    "failed",
    async (job, error) => {

        if (!job) return;

        console.error(`Job ${job.id} failed:`, error.message);

        // If all retries are exhausted
        if (job.attemptsMade >= (job.opts.attempts || 1)) {

            await SubSection.findByIdAndUpdate(
                job.data.subSectionId,
                {
                    summaryStatus: "FAILED",
                    summaryError: error.message,
                    questionsStatus: "FAILED",
                    questionsError: error.message,
                }
            );
        }
    }
);


summaryWorker.on(
    "error",
    (error) => {
        console.error("Summary worker error:", error);
    }
);


console.log("Lecture summary worker started...");