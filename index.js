const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db');
const User = require('./model/Post')
app.use(express.json())
db().then(()=>{
    console.log("succesfully connected to db")
}).catch(()=>{
    console.log("failure connecting to db")
})


app.get('/api/',(req,res)=>{
    res.send("welcome to our server")
})

app.get('/api/posts',(req,res)=>{
    User.find({}).then((data)=>{
        console.log(data)
        res.status(200).json(req.body)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/api/posts/:id',(req,res)=>{
    let postid = req.params.id;
    console.log(postid)
    User.find({_id : postid}).then((data)=>{
        console.log(data);
        res.json({data})
    }).catch((err)=>{
        console.log(err)
    })

})

app.post('/api/posts/',(req,res)=>{
    let newUser = new User({
        title : req.body.title,
        description : req.body.description
    })
    newUser.save().then((data)=>{
        console.log(data);
        res.json({message:" data created successfully"})
    }).catch((err)=>{
        res.send(err);
        console.log(err)
    })
})

app.put('/api/posts/:id',(req,res)=>{
    let postid = req.params.id;
    let newInfo = {
        title : 'new data',
        description : 'new data is being updated'
    }
    User.findByIdAndUpdate( postid, newInfo).then((data)=>{
        console.log(data);
        res.json({data})
    }).catch((err)=>{
        console.log(err)
    })
    
})

app.delete('/api/posts/:id',(req,res)=>{
    let postid = req.params.id;
    User.findByIdAndDelete(postid).then(()=>{
        console.log("data deleted successfully");
        res.json({message : "data deleted successfully"})
    }).catch((err)=>{
        console.log(err)
    })
})



app.listen(port,()=>{
    console.log("server started successfully")
})