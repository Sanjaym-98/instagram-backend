const router = require("express").Router();
const PostModel = require("./modelschema");
const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'dh25stzxv', 
    api_key: '879589417436149', 
    api_secret: 'mfQu-frn_Q17K6U6gYcph6dc05E' 
  });

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
         // const imageurl = await cloudinary.uploader.upload(req.files.PostImage.path,{folder:"Home"});
         const file= req.files.photo;
         await cloudinary.uploader.upload(file.tempFilePath,async(err,result)=>{
            console.log(result)
            let date = new Date();
        const data= {
            name: req.body.name,
            location: req.body.location,
            likes:req.body.likes,
            description:req.body.description,
            PostImage:result.url,
            date: `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`,
        }
        const Post_Insert = await PostModel.create(data);
        res.status(200).json({
            message:Post_Insert,
        })
         })
        
    }
    catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
})

module.exports = router;
