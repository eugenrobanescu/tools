const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please tell us your name!"],
        },
        email: {
            type: String,
            required: [true, "provide your email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        role: {
            type: String,
            enum: ["user", "barber", "admin"],
            default: "user",
        },
        password: {
            type: String,
            required: [true, "Please provide your password"],
            minlength: 8,
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, "Please confirm your password"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords are not the same!",
            },
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },

    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// userSchema.virtual("orders", {
//     ref: "Orders",
//     foreignField: "user",
//     localField: "_id",
// });

// Check if the password was modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Check if the password and confirm password are the same
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
