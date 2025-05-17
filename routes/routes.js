const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const moment = require('moment');

const Project = require('../models/project');
const Experience = require('../models/experience');

module.exports = router;

// GET all
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        const experiences = await Experience.find().sort({ job_number: -1 });
        // res.json(data);
        res.render('main', { moment: moment, items: { projects: projects, experiences: experiences }});
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

// == EXPERIENCES == //
// POST to Experiences
router.post('/experiences/post', async (req, res) => {
    const data = new Experience({
        job_number: req.body.job_number,
        job: req.body.job,
        company: req.body.company,
        start: req.body.start,
        end: req.body.end,
        len: req.body.len,
        job_type: req.body.job_type,
        positions: req.body.positions
    });

    try {
        await data.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// GET Experience by ID
router.get('/experiences/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        // res.json(data);
        // will change to render on different page to show single experience
        res.render('main', { items: { projects: [], experiences: experience } });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// UPDATE Experience by ID
router.patch('/experiences/:id/update', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Experience.findByIdAndUpdate(
            id, 
            updatedData,
            options
        );

        // res.send(result);
        // will change
        // res.render('main', { items: { projects: [], experiences: result } });
        res.redirect('/');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Experience by ID
router.delete('/experiences/:id/del', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Experience.findByIdAndDelete(id);
        // res.send(`Document with ${data.name} has been deleted...`);
        // will change
        res.render('main', { items: { projects: [], experiences: data } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
// ==== //

// == PROJECTS == //
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
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// GET Project by ID
router.get('/projects/:id', async (req, res) => {
    try {
        const projects = await Project.findById(req.params.id);
        // res.json(data);
        res.render('main', { items: { projects: projects, experiences: [] } });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

// UPDATE Project by ID
router.patch('/projects/:id/update', upload.single('img'), async (req, res) => {
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

        // res.send(result);
        res.render('main', { items: { projects: result, experiences: [] } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE Project by ID
router.delete('/projects/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Project.findByIdAndDelete(id);
        // res.send(`Document with ${data.name} has been deleted..`);
        res.render('main', { items: { projects: data, experiences: [] } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});