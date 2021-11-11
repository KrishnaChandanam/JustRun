const express= require('express');
const router=express.Router();
//const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Getting profile

router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate('user', ['name']);
  
      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// Profile creation

router.post(
    '/',
    [
      auth,
      [
        check('gender', 'Gender is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        gender,
        location
      } = req.body;
  
      const profileFields = {
        user: req.user.id,
        gender,
        location
        
      };
  
      
      try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

  //GET Profile

  router.get('/', async (req, res) => {
    try {
      const profiles = await Profile.find().populate('user', ['name' ]);
      res.json(profiles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  //GET Profile by userID

  router.get('/user/:user_id', async (req, res) => {
    try {
      const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name' ]);
      if (!profile) return res.status(400).json({ msg: 'Profile does not exist' });
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if(err.kind==='ObjectId'){
        
        return res.status(400).json({ msg: 'Profile does not exist' });

      }
      res.status(500).send('Server Error');
    }
  });

// Delete Profile/User

  router.delete('/', auth, async (req, res) => {
    try {
     
      // Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });
      // Remove user
      await User.findOneAndRemove({ _id: req.user.id });
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports= router;