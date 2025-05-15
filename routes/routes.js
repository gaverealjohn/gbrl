const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const Project = require('../models/project');

module.exports = router;

const encode = (url) => {
    const base64Img = require('base64-img');
    let data = base64Img.base64Sync(url);
    return data;
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        req.fileIdentifier = file.originalname + '-' + file.fieldname + '-' + Date.now();
        cb(null, req.fileIdentifier);
    }
});

let upload = multer({ storage: storage });

// GET all
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

// POST to Projects
router.post('/projects/post', upload.single('img'), async (req, res) => {
    const data = new Project({
        name: req.body.name,
        description: req.body.description,
        img: {
            data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.fileIdentifier)),
            contentType: 'image/png'
        }
    });

    try {
        await data.save();
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

// GET by ID
router.get('/projects/get/:id', async (req, res) => {
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
router.patch('/projects/update/:id', upload.single('img'), async (req, res) => {
    try {
        if (req.fileIdentifier != undefined) {
            req.body.img = {
                data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.fileIdentifier)),
                contentType: 'image/png'
            }
            fs.unlinkSync(path.join(process.cwd() + '/uploads/' + req.fileIdentifier));
        }

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Project.findByIdAndUpdate(
            id, 
            updatedData,
            options
        );

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE by ID
router.delete('/projects/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Project.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})