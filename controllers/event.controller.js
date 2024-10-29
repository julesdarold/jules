const Event = require('../models/event.model');
const UserModel = require('../models/user.model');
const User = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectID;
const express = require("express");

const getEvents = async (req, res) => {
    try {
        const event = await Event.find({});
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createevent = async (req, res) => {
    try {
       /* const  evenement = {
        nameEvent: req.body.nameEvent,
        creator: req.body.creator,
        participant:[],
        like:[],
        location: req.body.location,
        description: req.body.description,
        commentaire:[],
        }*/
       // const EVENT = req.body;
        const event = await Event.create(req.body);
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateevent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body);

        if (!event) {
            return res.status(404).json({ message: "This Event is not found" });
        }
        const updatedEvent = await Event.findById(id);      //returns the updated event
        res.status(200).json(updatedEvent);
    } catch {
        res.status(500).json({ message: error.message });
    }
}

const deleteevent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({ message: "event not found" });
        }
        res.status(200).json({ message: "event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const joinevent = async (req, res) => {
   const {eventId} = req.params;
   const {userId} = req.body; 
   try{
    const event = await Event.findById(eventId);
    if(!event){
        return res.status(404).json({message: "Event not found"});
    }

    if(event.participants.includes(userId)){
        return res.status(400).json({message: "User already joined this event"});
    }

    event.participants.push(userId);
    await event.save();
    res.status(200).json({message: "user successfully joined the event"});
   }catch(error){
    console.error("Error joining event: ", error);
    res.status(500).json({message: "Internal Server Error"});
   }

}

module.exports = {
    getEvents, getEvent, createevent, updateevent, deleteevent, joinevent
}