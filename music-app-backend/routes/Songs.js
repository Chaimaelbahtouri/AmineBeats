const express = require('express');
const router = express.Router();
const song = require('../models/Song');
const { protect, isAdmin } = require('../middleware/protect');

router.get('/',async(req, res, next)=>{
    try {
        const Song = await song.find()
        res.json(Song)

        } catch (error) {
        next(error)
    }
})
router.get('/:id',async(req,res,next) => {
    try{
        const Song = await song.findById(req.params.id)
        if(!song) {
            return res.status(404).json({error:"Song Not Found"})
        }
        res.json(Song);

    }catch (error) {
        next(error)
    }
})
router.post('/',protect, isAdmin, async(req, res, next)=>{
    try {
        const {title, artist,youtubeUrl,spotifyUrl,coverImage,createdAt} = req.body
        if(! title ||! artist) {
            return res.status(400).json({error:"title and artist reequired"})
        }
            const Song = new song({
                title, 
                artist,
                youtubeUrl,
                spotifyUrl,
                coverImage,
                createdAt
            })
        const saveSong = await Song.save()
        res.status(201).json(saveSong)
    } catch (error){
        next(error)
    }
})
router.put('/:id',protect,isAdmin, async(req, res, next)=>{
    try{
        const Song = await song.findById(req.params.id)
        if(!Song) {
            return res.status(400).json({error:"Song Not Found"})
        }
        const songUpdate = await song.findByIdAndUpdate (
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(songUpdate)

    }catch(error){
        next(error)
    }
})
router.delete('/:id',protect, isAdmin, async(req, res, next)=>{
    try {
        const Song = await song.findById(req.params.id)
        if (!Song) {
            return res.status(404).json({error:'Song Not Found'})
        }
        await song.findByIdAndDelete(req.params.id)
        res.json({message:"Song deleted"})
    } catch (error) {
        next(error)
    }    
})

module.exports = router;