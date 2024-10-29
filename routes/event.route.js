const express = require("express");
const Event = require('../models/event.model.js');
const router = express.Router();
const { getEvents, getEvent, createevent, updateevent, deleteevent, joinevent } = require("../controllers/event.controller.js");

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', createevent);
router.put('/:id', updateevent);
router.delete('/:id', deleteevent);
router.patch('/join/:id', joinevent);


module.exports = router;