const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const config = require('config');

router.post('/', async (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    config.get('client_id'),
    config.get('client_secret'),
    config.get('redirect_uris')
  );
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  // const scopes = [
  //   'https://www.googleapis.com/auth/calendar',
  //   'https://www.googleapis.com/auth/calendar.events',
  // ];

  // const url = await oauth2Client.generateAuthUrl({
  //   // 'online' (default) or 'offline' (gets refresh_token)
  //   access_type: 'offline',

  //   //If you only need one scope you can pass it as a string
  //   scope: scopes,
  //   prompt: 'consent',
  // });
  // console.log(url);

  try {
    const { tokens } = await oauth2Client.getToken(req.body.code);

    return res.json(tokens.refresh_token);
  } catch (err) {
    return res.status(400).json(err);
  }
});
module.exports = router;
