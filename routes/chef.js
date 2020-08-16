const axios = require('axios');
const express = require('express');
const router = express.Router();
const config = require('config');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
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
        start = new Date($(tds[2]).text() + '+0000');
        data.push({
          id: uuid(),
          platform: 'Codechef',
          title: $(tds[1]).text().replace(/\s\s+/g, ''),
          date: start.toUTCString().slice(0, -4), //Ist format
          start, //Gmt format
          end: new Date($(tds[3]).text() + '+0000').toUTCString().slice(0, -4),
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

          // have to check what happens if hr is in negative
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
    console.log(data);
    try {
      html = await axios.get(
        'https://www.hackerearth.com/challenges/?filters=competitive%2Chackathon%2Chiring'
      );
      $ = cheerio.load(html.data);
      $('.upcoming.challenge-list')
        .find('a')
        .each(async (i, el) => {
          var link = $(el).attr('href');
          if (link === undefined) return true;
          if (link[0] === '/') {
            link = 'https://www.hackerearth.com' + link;
          }
          const title = $(el)
            .find('.challenge-name.ellipsis.dark')
            .text()
            .replace(/\s\s+/g, '');
          const key = link.substr(39, 4);
          var enddate = '';
          var startdate = '';
          var start = '';
          let html1 = await axios.get(link);
          let $1 = cheerio.load(html1.data);
          var d = new Date();
          var year = d.getFullYear();
          if (key === 'comp' || key === 'hiri') {
            const a = $1('.timing-text.dark.regular.weight-700');
            const finaldate = $1(a[1])
              .text()
              .substr(0, 7)
              .concat(year, $1(a[1]).text().substr(7));
            const initialdate = $1(a[0])
              .text()
              .substr(0, 7)
              .concat(year, $1(a[0]).text().substr(7));
            const end = new Date(finaldate + '-1030');
            start = new Date(initialdate + '-1030');
            enddate = end.toUTCString().slice(0, -4).replace(/\s\s+/g, '');
            startdate = start.toUTCString().slice(0, -4).replace(/\s\s+/g, '');
          } else if (key === 'hack') {
            const a = $1('.regular.bold.desc.dark');
            const finaldate = $1(a[2]).text();
            const initialdate = $1(a[1]).text();
            const end = new Date(finaldate + '-1030');
            start = new Date(initialdate + '-1030');
            enddate = end.toUTCString().slice(0, -4).replace(/\s\s+/g, '');
            startdate = start.toUTCString().slice(0, -4).replace(/\s\s+/g, '');
          }
          data.push({
            id: uuid(),
            platform: 'Hackerearth',
            title: title,
            date: startdate,
            start: start,
            end: enddate,
            link: link,
          });
        });
      return res.json(data);
    } catch (err) {
      return res.status(500).send('Server Error');
    }

    // console.log(data);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
