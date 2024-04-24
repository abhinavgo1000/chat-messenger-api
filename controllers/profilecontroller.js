const Profile = require('../models/profile');

exports.createProfile = (req, res) => {
    const dob = req.body.dob;
    const sex = req.body.sex;
    const address = req.body.address;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    const profile = new Profile({
        dob: dob,
        sex: sex,
        address: address,
        imgSrc: imgSrc,
        imgAlt: imgAlt,
        userId: req.user._id
    });
    profile.save()
    .then(() => {
        console.log('profile created');
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.fetchProfile = (req, res) => {
    const id = req.params.id;
    Profile.findById(id)
    .then((profile) => {
        res.send(profile);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.fetchAllProfiles = (req, res) => {
    Profile.find()
    .then((profiles) => {
        res.send(profiles);
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.getUpdateProfile = (req, res) => {
    const editMode = req.query.edit;
    const profileId = req.params.profileId;
    Profile.findById(profileId)
    .then((profile) => {
        if (editMode) {
            res.send(profile);
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.updateProfile = (req, res) => {
    const profileId = req.body.profileId;
    const dob = req.body.dob;
    const sex = req.body.sex;
    const address = req.body.address;
    const imgSrc = req.body.imgSrc;
    const imgAlt = req.body.imgAlt;
    Profile.findById(profileId).then((profile) => {
        profile.dob = dob;
        profile.sex = sex;
        profile.address = address;
        profile.imgSrc = imgSrc;
        profile.imgAlt = imgAlt;
        return profile.save();
    })
    .then(() => {
        console.log('profile updated');
    })
    .catch((err) => {
        console.log(err);
    });
};

exports.deleteProfile = (req, res) => {
    const profileId = req.body.profileId;
    Profile.findByIdAndDelete(profileId)
    .then(() => {
        console.log('profile deleted');
    })
    .catch((err) => {
        console.log(err);
    });
};
