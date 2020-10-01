module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            res.status(404).json({
                status: "fail",
                message: err,
            });
        });
    };
};

//catchAsync -- lucrand foarte mult cu async- await trebuia de fiecare data sa pun try{} catch{}--vezi
// la controllers cum functioneaza
