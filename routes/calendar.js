const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const config = require('config');
const auth = require('../middleware/auth');

const UserEvents = require('../models/UserEvents');

//@route POST /calendar
//@desc Add contest to google cloud and mongodb
//@access PRIVATE
router.post('/', auth, async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    config.get('client_id'),
    config.get('client_secret'),
    config.get('redirect_uris')
  );

  oauth2Client.setCredentials({ refresh_token: req.body.gtoken });

  const { platform, title, link, start, end, date } = req.body.event;
  //for mongo db
  const newEvent = new UserEvents({
    platform,
    title,
    start,
    date,
    end,
    link,
    user: req.user.id,
  });

  // Cloudstart = { dateTime: new Date(date), timeZone: '+0000' };
  // Cloudend = { dateTime: new Date(end), timeZone: '+0000' };

  // Cloudstart = { dateTime: new Date(date), timeZone: '+0530' };
  // Cloudend = { dateTime: new Date(end), timeZone: '+0530' };

  const newCloudEvent = {
    summary: platform,
    description: title,
    start: { dateTime: new Date(date), timeZone: '+0530' },
    end: { dateTime: new Date(end), timeZone: '+0530' },
    colorId: 1,
  };

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      resource: newCloudEvent,
    });
    // console.log(event);
    try {
      const event = await newEvent.save();
      return res.json(event);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  } catch (err) {
    //console.log(err);
    res.status(400).json({ msg: 'Event not added' });
  }
});

//@route DELETE /calendar/:id
//@desc Delete Event from google cloud and mongodb
//@access PRIVATE
//parameters in req.body = link title token(google refresh token)
router.delete('/:id', auth, async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    config.get('client_id'),
    config.get('client_secret'),
    config.get('redirect_uris')
  );
  //console.log(req.body.event.gtoken);
  //console.log(req.body.event);
  oauth2Client.setCredentials({ refresh_token: req.body.event.gtoken });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  try {
    const events = await calendar.events.list({
      calendarId: 'primary',
      singleEvent: true,
      q: `${req.body.event.title}`,
    });

    //console.log(events.data.items);

    if (events.data.items.length === 0) {
      return res.status(400).json({ msg: 'No event ' });
    } else {
      try {
        await calendar.events.delete({
          calendarId: 'primary',
          eventId: events.data.items[0].id,
        });
        //console.log('Event deleted');
        try {
          let userEvent = await UserEvents.findById(req.params.id);
          if (!userEvent) console.log('Event doesnt exist');
          if (userEvent.user.toString() !== req.user.id) {
            return res.json(401).json({ msg: 'Not authorized' });
          }
          await UserEvents.findByIdAndRemove(req.params.id);
          return res.json({
            msg: `Event Removed  ${events.data.items[0].summary}`,
          });
        } catch (err) {
          // console.log(err);
          return res.status(500).send('Server Error');
        }
      } catch (err) {
        // console.log(err);
        return res.json({ msg: `Event not deleted` });
      }
    }
  } catch (err) {
    //console.log(err);
    return res.status(400).json({ msg: 'Sever Error' });
  }
});

//@route GET /calendar
//@desc Get events of user
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const events = await UserEvents.find({ user: req.user.id }).sort({
      start: 1,
    });
    return res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
module.exports = router;
