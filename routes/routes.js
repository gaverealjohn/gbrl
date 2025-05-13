const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Project = require('../models/project');

module.exports = router;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({ storage: storage });

// POST
// router.post('/post', (req, res) => {
//     res.send('Post API')
// });
router.post('/post', upload.single('img'), async (req, res) => {
    const data = new Project({
        name: req.body.name,
        description: req.body.description,
        img: {
            data: fs.readFileSync(path.join('C:/Users/luffy/Documents/dev/web/portfolio/gbrl' + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    });

    try {
        const dataToSave = await data.save();
        // res.status(200).json(dataToSave);
        res.redirect('/');
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/admin', async (req, res) => {
    try {
        const data = await Project.find();
        // res.json(data);
        res.render('admin', { items: data });
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

// GET all
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// });
router.get('/', async (req, res) => {
    try {
        const data = await Project.find();
        // res.json(data);
        res.render('main', { items: data });
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

// GET by ID
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// });
router.get('/get/:id', async (req, res) => {
    try {
        const data = await Project.findById(req.params.id);
        // res.json(data);
        res.render('main', { items: data });
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

// UPDATE by ID
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// });
router.patch('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        // const updatedData = req.body;
        const options = { new: true };

        const updatedData = new Project({
            name: req.body.name,
            description: req.body.description,
            img_url: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        });

        const result = await Project.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE by ID
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// });
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Project.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})