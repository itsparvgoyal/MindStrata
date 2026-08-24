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

    return await cloudinary.uploader.upload(
        file.tempFilePath,
        options
    );
};