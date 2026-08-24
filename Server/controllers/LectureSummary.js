const {generateLectureSummary} = require("../utilis/geminiServices.js");

exports.generateSummary = async (req, res) => {

    try {
        const { videoUrl, description } = req.body;

        if (!videoUrl) {
            return res.status(400).json({
                success: false,
                message: "Video URL is required",
            });
        }

        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Lecture description is required",
            });
        }

        const { summary, questions } = await generateLectureSummary(
            videoUrl,
            description
        );

        return res.status(200).json({
            success: true,
            summary,
            questions,
        });

    } catch (error) {

        console.error("Error generating lecture summary:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate lecture summary",
        });
    }
};