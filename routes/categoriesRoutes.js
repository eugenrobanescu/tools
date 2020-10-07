const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

router
    .route("/")
    .get(categoriesController.getCategories)
    .post(categoriesController.createCategory);

router.route("/rootCategories").get(categoriesController.getRootCategories);
router
    .route("/categoriesBySlug/:slug")
    .get(categoriesController.getCategoriesBySlug);
router
    .route("/parentCategories/:slug")
    .get(categoriesController.getParentBySlug);
router
    .route("/:id")
    .get(categoriesController.getCategoryById)
    .patch(categoriesController.getCategoryByIdAndUpdate)
    .delete(categoriesController.deleteCategory);

module.exports = router;
