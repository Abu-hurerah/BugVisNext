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

}

module.exports = Validator;
