const express = require('express')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/user')
const omit = require('lodash/omit')
exports.user_create = async (req, res) => {
    const { error, value: userReq } = validate(req.body)
    if (error) res.status(400).send(error.details[0].message)
    
    const { username, password } = userReq

    let user = await User.findOne({ username })
    if (user) return res.status(400).send('User already registered')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    user = new User({ ...userReq, password: hashedPassword,salt })

    await user.save()

    res.send(omit(user.toJSON(), ['__v', 'password']))
}



exports.user_list=async (req,res)=>{
    const user=await User.find();
    res.send(omit(user, ['__v', 'password']))
};

exports.user_details=async (req,res)=>{
/*
    Book.findById(req.params.id,(err,book)=>{
        if(err) return next(err);
        res.send(book.toJSON())
    })
*/
    const user=await User.findById(req.params.id)
    if(!user) return res.status(400).send("User not found")
    res.send(user)
};

exports.user_update=async (req,res)=>{
    const {error,value : userReq}=req.body
    if (error) res.status(400).send(error.details[0].message)

    await User.findByIdAndUpdate(req.params.id,{$set:userReq},(err,user)=>{
        if(err) return next(err);
        res.send(user)
    })
}

exports.user_delete=(req,res)=>{
    User.findByIdAndRemove(req.params.id,(err,user)=>{
        if(err) return next(err);
        res.send(user.toJSON())
    })
}
