const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Bun, in mongoDb trebuie sa specifici exact ce bagi in baza de data- super bun pentru securitate
//  si foarte multe optiuni, in ex de fata avem un user care are un nume/email/role etc-nu prea multe de zis,
// intre {} sunt optiunile

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
        // astea 2 ne ajutam sa le populam (.populate)
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// userSchema.virtual("orders", {
//     ref: "Orders",
//     foreignField: "user",
//     localField: "_id",
// });

// .pre('save') se intampla imediat inainte de a se salva in db
userSchema.pre("save", async function (next) {
    // if (!this.isModified("password")) return next();
    //Criptam parola
    this.password = await bcrypt.hash(this.password, 12);
    //Nu ne mai intereseaza passwordConfirm si il punem ca undefined
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// .methods sunt metode pe care le putem folosi in controller- deci nu fac nimic pana nu le invocam noi

// Check if the password and confirm password are the same
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    //false means no changed
    return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
