const express = require('express');
const schemas = require('../model/schema.js')
const multer = require('multer')
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