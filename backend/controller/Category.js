const Category = require("../Model/Category");

//create
exports.create = async (req, res, next) => {
    const newCategory = new Category(req.body)
    try {
        const saveCategory = await newCategory.save()
        res.status(200).json(saveCategory)
    } catch (error) {
        next(error)
    }
}

//find-all
exports.all = async (req, res, next) => {
    // const Category = req.query.category
    try {
        const category = await Category.find()
        res.status(200).json(category);
    } catch (error) {
        next(error.message)
    }
}