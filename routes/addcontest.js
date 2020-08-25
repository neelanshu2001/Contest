const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../middleware/auth');

const Contest = require('../models/contest');

//@route GET api/addcontest
//@desc Get all added contests
//@access public
router.get('/', (req, res) => {
    Contest.find()
        .sort({
            start: 1
        })
        .then(contests => res.json(contests));

});
//@route GET api/addcontest/user
//@desc Get added contests by user
//@access private
router.get('/user', auth, async (req, res) => {
    try {
        const contests = await Contest.find({
            user: req.user.id
        }).sort({
            start: 1,
        });
        return res.json(contests);
    } catch (err) {
        res.status(500).send('Server Error');
    }

});
//@route POST api/addcontest
//@desc Add a contest
//@access private
router.post('/', auth, (req, res) => {
    const newcontest = new Contest({
        platform: req.body.platform,
        title: req.body.title,
        startdate: req.body.startdate,
        starttime: req.body.starttime,
        enddate: req.body.enddate,
        endtime: req.body.endtime,
        link: req.body.link,
        user: req.user.id,
    });
    newcontest.save().then(contest => res.json(contest));
});
//@route DELETE api/addcontest/:id
//@desc Delete a contest
//@access private
router.delete('/:id', auth, (req, res) => {
    Contest.findById(req.params.id)
        .then(contest => contest.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false
        }));
});



module.exports = router;