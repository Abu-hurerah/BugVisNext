// Validator.js
class Validator {
    static validateRequiredFields(data, fields) {
        const missingFields = fields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }
    }

    static validateId(id) {
        if (!id || isNaN(parseInt(id))) {
            throw new Error("Invalid ID provided");
        }
    }
    static validateEmail(email) {
        console.log(email)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
    }
    static CheckBodyHasStatusOnly(body) {
        // Check if 'status' key is present
        if (!body.hasOwnProperty('status')) {
            throw new Error("Missing required field: status");
        }

        // Get all keys from the body
        const keys = Object.keys(body);

        // Check if there are any additional keys
        if (keys.length > 1) {
            throw new Error("Only 'status' field is allowed in the request body");
        }

        // Optionally, validate the value of 'status' if you need to enforce specific values
        if (!['active', 'inactive', 'pending'].includes(body.status)) {
            throw new Error("Invalid status value. Allowed values are 'active', 'inactive', 'pending'.");
        }
    }

}

module.exports = Validator;
