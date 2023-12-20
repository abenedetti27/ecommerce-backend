const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' }
      ]
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// get one product
router.get('/:id', (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag, as: 'tags' }
      ]
    });
    if (!product) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// create new product
router.post('/', (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedProduct[0] === 0) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll ({
        where: { product_id: req.params.id }
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newTagIds = req.body.tagIds.filter((tag_id) => !currentTagIds.includes(tag_id));

      const productTagIdArr = newTagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

      await ProductTag.destroy({
        where: {
          product_id: req.params.id,
          tag_id: currentTagIds,
      }
      });

      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json({ message: 'Product updated!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deletedProduct === 0) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      }
    });
    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

  