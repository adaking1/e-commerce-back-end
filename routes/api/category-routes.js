const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// this route gets all categories and their associated products
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this route gets a specific category by using its id
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
    res.status(500).json(err);
  }
});

// this post route creates a new category
router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      res.status(404).json({message: 'Enter a category name in the request body'})
    }
    res.status(200).json({message: 'Category Created!', newCategory});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this put route updates a specific category's name by using its id
router.put('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    categoryData.category_name = req.body.category_id;
    await categoryData.save();
    res.json({message: 'Category Updated!', categoryData});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this delete route deletes a specific category using its id
router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({where:{id: req.params.id}});
    if (!categoryData) {
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    res.status(200).json({message: 'Category Deleted!'});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
