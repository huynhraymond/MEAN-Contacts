
var router = require('express').Router();

var ContactModel = require('../models/contact_model');

router.get('/', function(req, res) {
    ContactModel.find( {}, function(err, result) {
        if (err) res.status(500).json(err);

        else res.status(200).json(result);
    });
});

router.post('/save', function(req, res) {

    console.log(req.params._id);

    (new ContactModel(req.body)).save(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });

});

router.put('/update/:_id', function(req, res) {

    ContactModel.findByIdAndUpdate( {_id: req.params._id}, req.body, {new: true}, function(err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });
    /*
    ContactModel.findOneAndUpdate({_id: req.params._id}, req.body, {upsert: true, new: true}, function(err, result) {
        if (err) res.status(500).json(err);

        else res.status(200).json(result);
    });  */
});

router.delete('/:_id', function(req, res) {
    //res.status(200).json( {message: 'DELETE_IMP_L101' });
    console.log('DELETING ' + req.params._id);
    ContactModel.remove( { _id: req.params._id }, function(err, result) {
        if (err) res.status(500).json(err);

        else {
            res.status(200).json(result);
            //console.log(result);
        }
    });
});

module.exports = router;
