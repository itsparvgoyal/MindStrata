const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mongoose = require("mongoose");


// helper fucn 
const alreadyEnrolled = (course, userID) => {
    if(!course || !userID) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    for(uid of course?.studentsEnrolled) {
        if(uid.toString() == userID.toString()) {
            return true;
        }
    }
    return false;
}


// capture payment
const capturePayment = async (req, res) => {
    try {
        // get course id and user id 
        // console.log("1")
        const userID = req.user.id;
        const  courseIDs  = req.body;

        // valiadate user authentication
        // console.log("2")
        if (!userID || !courseIDs) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // console.log("3")
        // check if ids length is 0 
        if (courseIDs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No course selected",
            });
        }
        // console.log("4")
        let totalAmount = 0;
        // console.log("5")
        for (const courseID of courseIDs) {
            // console.log("6")
            // check if course id is valid
            const course = await Course.findById(courseID);
            // console.log("7")
            if (!course) {
                return res.status(400).json({
                    success: false,
                    message: "Course not found",
                });
            } 
            // console.log("8")
            if (alreadyEnrolled(course , userID)) {
                return res.status(400).json({
                    success: false,
                    message: "User already enrolled in this course",
                });
            }
            // console.log("9")
            totalAmount += course.price;
            // console.log("10")
        }
        // console.log("10")
        // create order
        const amount = totalAmount;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString()
        };

        const order = await instance.orders.create(options);

        // return response
        return res.status(200).json({
            success: true,
            order
        });


    } catch (error) {
        console.log("error in capturing payement", error);
        return res.status(500).json({
            success: false,
            message: "error in capturing payement",
        });
    }
}


// helper fucn 
const enrollStudentsInCourse = async (courses, userID) => {

    if (!courses || !userID) {
        throw new Error("All fields are required");
    }

    for (const courseId of courses) {

        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $addToSet: {
                    studentsEnrolled: userID
                }
            },
            { new: true }
        );

        if (!enrolledCourse) {
            throw new Error("Course not found");
        }

        await User.findByIdAndUpdate(
            userID,
            {
                $addToSet: {
                    courses: courseId
                }
            },
            { new: true }
        );
    }
}

// verify kro payement 
const verifyPayment = async (req, res) => {

    try {
        // syntax hi hai 
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseIDs } = req.body;
        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

        const userID = req.user.id;


        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseIDs || !userID) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (expectedSignature === razorpay_signature) {
            // enroll user in course
            await enrollStudentsInCourse(courseIDs, userID);

            // find updated user 
            const updatedUser = await User.findById(userID).populate("additionalDetails").exec();
                               

            // return response 
            res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                updatedUser
            });

            // send mail to user 
            // todo 

        } else {
            console.log("Payment is invalid");
            return res.status(401).json({ success: false, message: "Payment is invalid" });
        }

    } catch (error) {
        console.log("error in verifying payement", error);
        return res.status(500).json({
            success: false,
            message: "error in verifying payement",
        });
    }
}

module.exports = { capturePayment, verifyPayment };