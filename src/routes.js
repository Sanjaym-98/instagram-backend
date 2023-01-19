const router = require("express").Router();
const PostModel = require("./modelschema");
const cloudinary = require("cloudinary")

router.get ("/", async(req, res)=>{
    try{
        const posts= await PostModel.find().sort({_id:-1});
        res.json(posts);
    }
    catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
})

router.post("/", async(req,res)=>{
    try{
        const imageurl = await cloudinary.uploader.upload(req.files.PostImage.path,{folder:"Home"});
        let date = new Date();
        const data= {
            name: req.fields.name,
            location: req.fields.location,
            likes:req.fields.likes,
            description:req.fields.description,
            PostImage:imageurl.url,
            date: `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`,
        }
        const Post_Insert = await PostModel.create(data);
        res.status(200).json({
            message:Post_Insert,
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
})

module.exports = router;