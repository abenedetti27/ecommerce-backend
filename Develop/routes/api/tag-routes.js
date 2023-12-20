const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price'], through: ProductTag, as: 'products' }]
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
  // find all tags
  // be sure to include its associated Product data

router.get('/:id', (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, attributes: ['id', 'product_name', 'price'], through: ProductTag, as: 'products' }]
    });

    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  // create a new tag
});

router.put('/:id', (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id }
    });

    if (updatedTag[0] === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (deletedTag === 0) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    // Delete associated product tags
    await ProductTag.destroy({
      where: { tag_id: req.params.id }
    });

    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
  // delete on tag by its `id` value
});

module.exports = router;
