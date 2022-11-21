const Cook = require('../models/cook')

exports.createCook = (req, res) => {
    try {
        const newCook = new Cook(req.body)
        newCook.save((err, success) => {
            if (err || !success) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(success)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.getCook = (req, res) => {
    Cook.find().exec((err, success) => {
        if(err || !success) {
            console.log(err)
            res.status(400).json({
                error: err
            })
        } else {
            res.json(success)
        }
    })
}

exports.updateCook = (req, res) => {
    console.log(req.body)
    Cook.findByIdAndUpdate(req.body._id, req.body, {new: true}).exec((err, success) => {
        if(err || !success) {
            console.log(err)
            res.status(400).json({
                error: err
            })
        } else {
            res.json(success)
        }
    })
}

exports.deleteCook = (req, res) => {
    Cook.findByIdAndDelete(req.params._id).exec((err, success) => {
        if(err || !success) {
            console.log(err)
            res.status(400).json({
                error: err
            })
        } else {
            res.json(success)
        }
    })
}