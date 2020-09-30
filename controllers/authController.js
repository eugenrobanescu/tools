const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
    };
    res.cookie("jwt", token, cookieOptions);

    // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    // const token = signToken(newUser._id);

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            msg: "Please provide email and password!",
        });
    }

    const user = await User.findOne({ email }).select("+password");

    // .populate("orders");
    // const correct = await user.correctPassword(password, user.password);

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorect email or passowrd!", 401));
    }

    const token = signToken(user._id);

    createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it s there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    console.log(req.cookies.jwt);

    if (!token) {
        return next(
            new AppError(
                "You are not logged in! Plese log in to get access",
                401
            )
        );
    }

    // Verification token

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Check if user still exists

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist"
            )
        );
    }

    // Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "User recently cnahger password! Please log in again",
                401
            )
        );
    }
    req.user = currentUser;

    next();
});

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next(new AppError("The user does not exist", 404));
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next(new AppError("The user changed password", 400));
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            res.status(201).json({
                status: "success",
                isLoggedIn: true,
            });
        } catch (err) {
            res.status(201).json({
                status: "fail",
                isLoggedIn: false,
            });
        }
    } else {
        res.status(201).json({
            status: "fail",
            isLoggedIn: false,
        });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action",
                    403
                )
            );
        }
        next();
    };
};
