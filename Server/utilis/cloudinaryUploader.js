const fs = require("fs");
const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async (
    file,
    folder,
    quality
) => {

    const options = {
        folder,
        resource_type: "auto",
    };

    if (quality) {
        options.quality = quality;
    }

    options.public_id = `${Date.now()}`;

    try {
        const response = await cloudinary.uploader.upload(
            file.tempFilePath,
            options
        );
        
        // Asynchronously delete the temp file
        fs.unlink(file.tempFilePath, (err) => {
            if (err) console.error("Error deleting temp file:", err);
        });
        
        return response;
    } catch (error) {
        // Asynchronously delete the temp file even on error
        fs.unlink(file.tempFilePath, (err) => {
            if (err) console.error("Error deleting temp file on failure:", err);
        });
        throw error;
    }
};