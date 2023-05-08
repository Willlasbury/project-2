const router = require('express').Router();
const {Project, Task } = require('../../models');
// The `/api/products` endpoint

// get all projects
  router.get('/', async (req, res) => {
  // find all projects
  // be sure to include its associated Category and Tag data
    try{
    const projects = await Project.findAll( {
    include: [{ model: Task}],
    });
    res.json(projects);
    }catch (err){
    res.status(500).json(err);
    }
  });
  // get one project
router.get('/:id', async (req, res) => {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    try {
      const projectID = await Project.findByPk(req.params.id, {
        include: [{ model:Task}],
      });
  
      if (!projectID) {
        res.status(404).json({ message: 'No project found with that id!' });
        return;
      }
  
      res.status(200).json(projectID);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // create new project
  router.post('/', (req, res) => {
    Project.create(req.body)
      .then((newProject) => {
        res.json(newProject);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
  // update project
  router.put('/:id', (req, res) => {
    Project.update(
      {
        title: req.body.title,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedProject) => {
        res.json(updatedProject);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });
   // delete a product by its `id` value
  router.delete('/:id', (req, res) => {
    Project.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((deletedProject)=>{
      res.json(deletedProject);
    })
    .catch((err) => res.json(err));
  })
  
  module.exports = router;
  