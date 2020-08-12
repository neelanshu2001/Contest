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
    let html = await axios.get(config.get('chef_url'));
    let $ = await cheerio.load(html.data);
    let data = [];

    $('h3[id="future-contests"]')
      .next()
      .find('tbody')
      .find('tr')
      .each((i, el) => {
        tds = $(el).find('td');
        prelink = $(tds).find('a').attr('href');
        start = new Date($(tds[2]).text());
        data.push({
          id: uuid(),
          platform: 'Codechef',
          title: $(tds[1]).text().replace(/\s\s+/g, ''),
          date: start.toUTCString().slice(0, -4), //Ist format
          start, //Gmt format
          end: new Date($(tds[3]).text()).toUTCString().slice(0, -4),
          link: `https://www.codechef.com${prelink}`,
        });
      });
    try {
      const predata = await axios.get(config.get('forces_url'));

      predata.data.result.map((postdata, i) => {
        if (postdata.phase !== 'FINISHED' && i <= 8) {
          contestid = postdata.id;
          data.push({
            id: uuid(),
            platform: 'CodeForces',
            title: postdata.name,

            date: new Date((postdata.startTimeSeconds + 19800) * 1000)
              .toUTCString()
              .slice(0, -4), //IST format
            start: new Date(postdata.startTimeSeconds * 1000), //GMT Format
            end: new Date(
              (postdata.durationSeconds + 19800 + postdata.startTimeSeconds) *
                1000
            )
              .toUTCString()
              .slice(0, -4),
            link: `https://codeforces.com/contests/${contestid}`,
          });
        }
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
    try {
      html = await axios.get('https://atcoder.jp/contests/');
      $ = cheerio.load(html.data);
      $('#contest-table-upcoming')
        .find('tbody')
        .find('tr')
        .each((i, el) => {
          tds = $(el).find('td');
          prelink = $(tds[1]).find('a').attr('href');
          start = new Date($(tds[0]).text().slice(0, -4) + '0330');

          //have to check what happens if hr is in negative
          hr = 3 - parseInt($(tds[2]).text().slice(0, 2));
          min = 30 - parseInt($(tds[2]).text().slice(3, 5));
          if (min <= 0) {
            hr = hr - 1;
            min = min + 60;
          }
          hr = hr.toString();
          minute = min.toString();

          time = '0' + hr + '0' + minute;
          if (min >= 10) {
            time = '0' + hr + minute;
          }

          data.push({
            id: uuid(),
            platform: 'Atcoder',
            title: $(tds[1]).find('a').text(),
            date: start.toUTCString().slice(0, -4),
            start,
            end: new Date($(tds[0]).text().slice(0, -4) + time)
              .toUTCString()
              .slice(0, -4),

            link: `https://atcoder.jp${prelink}`,
          });
        });
    } catch (err) {
      return res.status(500).send('Server Error');
    }

    data.sort((a, b) => a.start.valueOf() - b.start.valueOf());
    return res.json(data);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
