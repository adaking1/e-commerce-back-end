const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// this route gets all tag data and their associated products
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this route gets a specific tags data by usin its id
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagData){
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this post route creates a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    if (!tagData) {
      res.status(404).json({message: 'Enter tag name in the request body'})
    }
    res.status(200).json({message: 'Tag Created!', tagData});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this put route updates a tag's name by using its id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id);
    if (!tagData){
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    tagData.tag_name = req.body.tag_name;
    await tagData.save();
    res.status(200).json({message: 'Tag Updated!', tagData});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// this delete route deletes a specific tag by using its id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({where:{id: req.params.id}});
    if (!tagData) {
      res.status(404).json({message: 'No tag with this id'});
      return;
    }
    res.status(200).json({message: 'Tag Deleted!'});
  }
  catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
