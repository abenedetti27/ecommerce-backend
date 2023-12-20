
# employee-tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description <a name="description"></a>

This back end for an e-commerce website uses the latest technologies.

## Table of Contents 
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Questions](#questions)

## Installation <a name="installation"></a>
GIVEN a functional Express.js API
When a user add their database name, MySQL username, and MySQL password to an environment variable file, they are able to connect to a database using Sequelize. When they enter schema and seed commands, a development database is created and is seeded with test data.

When the user enters the command to invoke the application, their server is started and the Sequelize models are synced to the MySQL database. WHen the user opens API GET routes in Insomnia Core for categories, products, or tags, the data for each of these routes is displayed in a formatted JSON.

WHen the user tests API POST, PUT, and DELETE routes in Insomnia Core, they are able to successfully create, update, and delete data in my database

```
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

```

## Usage <a name="usage"></a>
This is a back end for and e-commerce website that uses the latest technologies so that a company that uses it can compete with other e-commerce companies.

## License <a name="license"></a>
MIT License


## Questions <a name="questions"></a>

GitHub Profile: [github](https://github.com/abenedetti27)

Please direct any questions to:

Email: abenedetti27@gmail.com
