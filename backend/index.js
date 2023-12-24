const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = process.env.PORT;
const prisma = new PrismaClient();

//json
app.use(express.json());

//cores
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//api
app.get('/', (req,res)=> {
    try {
        console.log(" / on 5000");
        res.json("listen on 500");
    } catch (error) {
      res.status(500).json({message: error.message})  
    }
})

app.get('/test', (req,res)=> {
    try {
        res.status(200).json({ message: "API is working"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
//get all users
app.get('/users', async(req,res)=> {
    try {
        const users= await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
    res.status(500).json({ message: error.message})    
    }
});
//get user by id
app.get('/users/:id', async(req,res)=> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message});        
    }
})

//create user
app.post('/users', async(req,res)=> {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            },
        });
        res.status(201).json(user);
    } catch (error) {
      res.status(500).json({message: error.message})  
    }
});
//update user
app.put("/users/:id", async(req,res)=> {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        })
        res.status(500).json(user);
    } catch (error) {
     res.status(500).json({message: error.message})   
    }
});

//delete user

app.delete("/users/:id", async(req,res)=> {
    try {
        const user = await prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user);
        
    } catch (error) {
      res.status(500).json({ message: error.message})  
    }
});

app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));