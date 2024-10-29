const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
require('./.config/database');
dotenv.config();
const userRoutes = require('./routes/user.route');
const eventRoutes = require('./routes/event.route.js');
//-------------------------------------------------

const app = express()
const PORT = process.env.PORT || 4012;


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());            //********(BLJD)*******

// point de sorti de la table user et evenement
app.use('/user', userRoutes);
app.use("/event", eventRoutes);


//////////////////////////////////////////////////////////////////////////////

const Event = require('./models/event.model.js'); // Importer le modèle Event
const User = require('./models/user.model.js'); // Importer le modèle User









app.post('/events/:eventId/participants', async (req, res) => {
    const { participantId } = req.body;
    const { eventId } = req.params;
  
    try {
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $push: { participants: participantId } },
        { new: true, runValidators: true }
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




// Lancement du server 
app.listen(PORT, '0.0.0.0', () => console.log(`\tlistening in port ${PORT}`));