const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


const generateLectureSummary = async (
    videoUrl,
    description
) => {

    const tempVideoPath = path.join(
        __dirname,
        `temp-${Date.now()}.mp4`
    );

    let file;

    try {

        // 1. download video
        console.log("Downloading lecture...");

        const videoResponse = await fetch(videoUrl);

        if (!videoResponse.ok) {
            throw new Error(
                `Failed to download video: ${videoResponse.status}`
            );
        }

        // downloaded video ke raw binary data ko Node.js ke Buffer (node js ka ek obj hai jo binary data ke sath easy khelne deta hai) mein convert karke memory mein rakh do.
        const videoBuffer = Buffer.from(
            await videoResponse.arrayBuffer()
        );

        console.log(
            "Video size:",
            (videoBuffer.length / 1024 / 1024).toFixed(2),
            "MB"
        );


        // 2. save temp
        fs.writeFileSync(
            tempVideoPath,
            videoBuffer
        );


        // 3. upload to Gemini
        console.log("Uploading to Gemini...");

        file = await ai.files.upload({
            file: tempVideoPath,

            config: {
                mimeType: "video/mp4",
            },
        });

        console.log(
            "Gemini file:",
            file.name
        );


        // 4. wait for processing
        while (file.state === "PROCESSING") {

            console.log(
                "Gemini processing:",
                file.state
            );

            await sleep(5000); // 5s baad wait kro fer wapis check krna 

            file = await ai.files.get({
                name: file.name,
            });
        }

        if (file.state === "FAILED") {
            throw new Error(
                "Gemini failed to process video"
            );
        }

        if (file.state !== "ACTIVE") {
            throw new Error(
                `Unexpected Gemini file state: ${file.state}`
            );
        }

        console.log("Gemini video ACTIVE.");
        // ab lec pura gemini pe upload hai and ab kaam krne ke lie ready hai 


        // 5. generate summary and quiz
        console.log(
            "Generating lecture summary and quiz..."
        );

        const response =
            await ai.interactions.create({

                model: "gemini-3.5-flash-lite",

                input: [
                    {
                        type: "video",
                        uri: file.uri,
                        mime_type: file.mimeType,
                    },

                    {
                        type: "text",
                        text: `
                            You are an expert university lecture assistant and academic assessment generator.

                            Your task is to analyze the COMPLETE lecture video and generate:
                            1. A concise, accurate revision summary.
                            2. A 5-question MCQ test based ONLY on the lecture.

                            LECTURE DESCRIPTION:
                            ${description}

                            ==================================================
                            IMPORTANT SOURCE RULE — STRICT
                            ==================================================

                            The lecture video and the lecture description are the ONLY sources of truth.

                            You may use ONLY information that is:
                            - Explicitly stated in the lecture.
                            - Explained by the instructor.
                            - Written or shown in the lecture.
                            - Demonstrated in the lecture.
                            - Clearly supported by the lecture description.

                            DO NOT:
                            - Add information from your own knowledge.
                            - Use outside knowledge.
                            - Assume or guess missing information.
                            - Invent examples, definitions, facts, formulas, explanations, or conclusions.
                            - Create questions about topics that were not taught.
                            - Use general textbook knowledge unless it was explicitly covered in the lecture.
                            - Infer information that is not clearly supported by the lecture.

                            If something is unclear, incomplete, or cannot be confidently understood from the lecture, DO NOT use it.

                            IMPORTANT:
                            - Analyze the ENTIRE lecture from beginning to end before generating the response.
                            - Do not focus only on the beginning or ending.
                            - The lecture content has higher priority than general knowledge.
                            - Accuracy is more important than completeness.
                            - Every statement in the summary must be traceable to the lecture or description.
                            - Every MCQ must be directly related to something taught or explicitly described.

                            ==================================================
                            OUTPUT REQUIREMENT
                            ==================================================

                            Your response MUST contain EXACTLY TWO PARTS:

                            # PART 1 — SUMMARY

                            # 1. Overview
                            Give a short overview of what the lecture teaches.

                            # 2. Main Topics Covered
                            List ONLY the major topics actually covered in the lecture.

                            Rules:
                            - Use a clean bullet list.
                            - Mention topic names only.
                            - Do not add explanations here.
                            - Do not include topics that were not covered.

                            # 3. Important Concepts
                            Explain the most important concepts taught in the lecture.

                            For each concept:
                            - **Concept:** Name of the concept
                            - **Explanation:** Give a simple, student-friendly explanation based ONLY on the lecture.

                            Rules:
                            - Keep explanations concise.
                            - Do not add outside knowledge.
                            - Do not expand beyond what the instructor explained.

                            # 4. Examples / Problems Discussed
                            Mention ONLY examples, questions, problems, numerical problems, case studies, demonstrations, or applications actually discussed in the lecture.

                            For each:
                            - **Name/Question:** Use the question number or name if available.
                            - **What was discussed:** Briefly describe what was discussed, ONLY if necessary.

                            Do NOT solve a problem unless the lecture itself explained the solution or reasoning.

                            ==================================================
                            PART 2 — TEST
                            ==================================================

                            Create EXACTLY 5 multiple-choice questions (MCQs).

                            The questions should test understanding of the lecture rather than simple memorization whenever the lecture provides enough information to do so.

                            DIFFICULTY:
                            - Questions should be of a good university-level difficulty.
                            - Include conceptual/application-based questions where possible.
                            - Avoid unnecessarily tricky or ambiguous questions.
                            - Do not make questions difficult by introducing information outside the lecture.
                            - Difficulty must come from understanding and applying information that was actually taught.

                            STRICT MCQ SOURCE RULE:
                            Every MCQ MUST be answerable using ONLY:
                            1. The lecture video, and/or
                            2. The lecture description.

                            Before creating each MCQ, verify:
                            - Was the concept/topic actually covered?
                            - Is the correct answer supported by the lecture?
                            - Are all necessary facts present in the lecture?
                            - Is the question free from outside knowledge?

                            If any MCQ cannot pass these checks, replace it.

                            Each MCQ MUST have:
                            - A clear question.
                            - Exactly 4 options.
                            - Exactly 1 correct answer.
                            - The correct answer.
                            - A short explanation/solution.

                            MCQ FORMAT:

                            ### Q1. [Question]

                            A. [Option]
                            B. [Option]
                            C. [Option]
                            D. [Option]

                            **Correct Answer:** [A/B/C/D]

                            **Explanation:** [Maximum 30 words]

                            Repeat the same format for Q2, Q3, Q4, and Q5.

                            IMPORTANT MCQ RULES:
                            - Exactly 5 questions. No more, no fewer.
                            - Exactly 4 options per question.
                            - Only ONE option can be correct.
                            - Do not use "All of the above".
                            - Do not use "None of the above".
                            - Do not create ambiguous options.
                            - Do not include facts that were not taught.
                            - Do not mention information that is only implied unless the implication is explicitly established in the lecture.
                            - Do not create questions from general subject knowledge.
                            - Do not repeat the same concept unnecessarily.
                            - Prefer covering different important concepts from the lecture.
                            - The explanation/solution for every MCQ MUST be 30 words or fewer.
                            - The explanation must explain WHY the correct answer is correct using only lecture information.

                            ==================================================
                            FINAL VALIDATION
                            ==================================================

                            Before generating the final response, internally verify all of the following:

                            SUMMARY:
                            ✓ Entire lecture was analyzed.
                            ✓ Overview reflects the actual lecture.
                            ✓ Main Topics contains ONLY major topics actually covered.
                            ✓ Important Concepts contains ONLY concepts taught.
                            ✓ Examples/Problems contains ONLY things actually discussed.
                            ✓ No outside information was added.
                            ✓ Nothing was guessed or invented.

                            TEST:
                            ✓ Exactly 5 MCQs.
                            ✓ Each MCQ has exactly 4 options.
                            ✓ Each MCQ has exactly 1 correct answer.
                            ✓ Every MCQ is directly supported by the lecture or description.
                            ✓ No outside knowledge was used.
                            ✓ Questions test meaningful understanding where possible.
                            ✓ No ambiguous questions.
                            ✓ No repeated questions.
                            ✓ Every explanation is 30 words or fewer.
                            ✓ Every explanation is supported by the lecture.

                            FINAL RESPONSE RULE:
                            Return ONLY the formatted two-part response.

                            Do not add:
                            - Introduction before Part 1.
                            - Conclusion after Part 2.
                            - Notes about the generation process.
                            - Warnings.
                            - Comments about uncertainty.
                            - Any information outside the requested format.

                            The final response must contain ONLY:

                            # PART 1 — SUMMARY
                            [Summary sections]

                            # PART 2 — TEST
                            [Exactly 5 MCQs]
                            `,
                    },
                ],
            });

        const outputText = response.output_text;
        let summary = outputText;
        let questions = "";
        const part2Regex = /#+\s*PART\s*2\s*[\-—–\s:]+\s*TEST/i;
        const parts = outputText.split(part2Regex);
        if (parts.length >= 2) {
            summary = parts[0].replace(/#+\s*PART\s*1\s*[\-—–\s:]+\s*SUMMARY/i, "").trim();
            questions = parts[1].trim();
        }

        return { summary, questions };

    } finally {

        // 6. cleanup 
        // delete file from gemini storage to free up quota
        if (file && file.name) {
            try {
                console.log("Deleting Gemini uploaded file:", file.name);
                await ai.files.delete({ name: file.name });
                console.log("Gemini file deleted successfully.");
            } catch (err) {
                console.error("Failed to delete Gemini file:", err);
            }
        }

        // delete local video file
        if (fs.existsSync(tempVideoPath)) {
            fs.unlinkSync(tempVideoPath);
            console.log(
                "Temporary video deleted."
            );
        }
    }
};

module.exports = {
    generateLectureSummary,
};