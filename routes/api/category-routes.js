const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
  // TRY USING "include:[{}]"
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category with this id!'});
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(404).json({message: 'No category with this id!'})
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    res.json(200).json(newCategory);
  }
  catch (err) {
    res.json(500).json(err);
  }
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
