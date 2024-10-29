const mongoose = require('mongoose');

const EventSchema =  new mongoose.Schema(
    {
        nameEvent: {
            type: String,
            required:[true, "Please Enter an Event name"],
            minLength: 3,
            maxLength: 55,
           // unique: true,
        },

        creator:{
            type: String,
            required: true,
        },

        location: {
            type: String,
            required:[true, "Please Enter the events location"],
            minLength: 2,
            maxLength: 60,
        },

        dateDebut: {
            type: Date,
           // required:[true, "Please Enter the starting date"],
        },

        dateFin: {
            type: Date,
           // required:[true, "Please Enter the Ending date"],
        },

        description: {
            type: String,
            required: [true, "Decrivez nous votre evenement"],
        },

        category: {
            type: String,
            required: false,
        },

        participants: [ 
            {
                type: String, 
                 required: true
            }],

        commentaire: {
           type: [{
                commentId: String,
                CreatorId: String,
                Content: String, 
            },
            {
                timestamps: true,
            }],
            required: true,
        }, 

        like: [String],

        image: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", EventSchema);


module.exports = Event; 
