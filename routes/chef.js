const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('config');
const cheerio = require('cheerio');
const { v4: uuid } = require('uuid');
//@route GET /contests
//@desc Getting scrapped data
//@access PUBLIC

router.get('/', async (req, res) => {
  try {
    const html = await axios.get(config.get('chef_url'));
    const $ = await cheerio.load(html.data);
    let data = [];

    $('h3[id="future-contests"]')
      .next()
      .find('tbody')
      .find('tr')
      .each((i, el) => {
        tds = $(el).find('td');
        prelink = $(tds).find('a').attr('href');
        data.push({
          id: uuid(),
          platform: 'Codechef',
          title: $(tds[1]).text().replace(/\s\s+/g, ''),
          date: $(tds[2]).text(), //Ist format
          start: new Date($(tds[2]).text()), //Gmt format
          end: $(tds[3]).text(),
          link: `https://www.codechef.com${prelink}`,
        });
      });
    try {
      const predata = await axios.get(config.get('forces_url'));

      predata.data.result.map((postdata, i) => {
        if (postdata.phase !== 'FINISHED' && i <= 8) {
          data.push({
            id: uuid(),
            platform: 'CodeForces',
            title: postdata.name,

            date: new Date((postdata.startTimeSeconds + 19800) * 1000)
              .toUTCString()
              .slice(5, -4), //IST format
            start: new Date(postdata.startTimeSeconds * 1000), //GMT Format
            end: new Date(
              (postdata.durationSeconds + 19800 + postdata.startTimeSeconds) *
                1000
            )
              .toUTCString()
              .slice(5, -4),
            link: null,
          });
        }
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }

    data.sort((a, b) => a.start.valueOf() - b.start.valueOf());
    return res.json(data);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
