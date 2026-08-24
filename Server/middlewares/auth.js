const jwt = require("jsonwebtoken");


// for authentication 
const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Access token is missing" 
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  
            req.user = decoded;
            next();
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ 
                    success: false, 
                    errorType: "TokenExpired", 
                    message: "Access token has expired" 
                });
            }
            return res.status(401).json({ 
                success: false, 
                message: "Invalid access token" 
            });
        }
    } catch (error) {
        console.log("Error in authentication middleware:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error" 
        });
    }
}


// for student 
const isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log("Error in student middleware:", error);
        res.status(500).json({
            success: false,
            error: "Internal server error" 
        });
    }
}

// for instructor 
const isInstructor = async (req, res, next) => {
    try {
        if (req.user.role !== "Instructor") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log("Error in instructor middleware:", error);
        res.status(500).json({
            success: false,
             error: "Internal server error" 
        });
    }
}

// is Admin 
const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log("Error in admin middleware:", error);
        res.status(500).json({
            success: false,
             error: "Internal server error" 
        });
    }
}

module.exports = {
    auth,
    isStudent,
    isInstructor,
    isAdmin
}