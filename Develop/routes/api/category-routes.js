const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price'] }],
    });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }  

});

router.get('/:id', (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price'] }],
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', (req, res) => {
  try {
    cont updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedCategory[0] === 0) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Category updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
 
});

module.exports = router;
