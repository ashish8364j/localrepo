const express = require('express');
const schemas = require('../model/schema.js')
const path = require('path')
console.log(schemas);
class studentController {

    static homepage=async(req,res)=>{
        console.log('okay');
        res.render('home.ejs')
    }
    static upload=async(req,res)=>{
        return res.redirect('/home')
    }
}
module.exports = studentController;  