// src/middlewares/validation.middleware.js

export const validate = (schema) => (req, res, next) => {
    try {
        // Validate req.body for POST/PUT/PATCH
        if (req.body && Object.keys(req.body).length > 0) {
            schema.parse(req.body);
        }
        // Validate req.query for GET (pagination/search)
        if (req.query && Object.keys(req.query).length > 0) {
            req.query = schema.parse(req.query); // Overwrite req.query with parsed values
        }
        next();
    } catch (error) {
        if (error.issues) {
            // Zod validation error
            const issues = error.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }));
            return res.status(400).json({
                message: "Validation failed",
                errors: issues
            });
        }
        // Other unexpected error
        console.error("Validation Middleware Error:", error);
        return res.status(500).json({ message: "An unexpected error occurred during validation." });
    }
};
