import express from 'express';

const app=express()
const port = process.env.PORT || 8010;

app.use(express.json())//fetching data in json format

 let data=[]

 let nextid=1;

 //POST ALL THE LIST ITEMS 

 app.post('/listings',(req,res)=>{
    const{title,description,seller,rating}=req.body;
    const listing={id:nextid++,title,description,seller,rating};
    data.push(listing);
    res.status(201).json({data:listing});

 });

 //GET ALL THE LIST ITEMS 

app.get('/listings',(req,res)=>{
    res.status(201).send(data)
})

//GET A LIST ITEM BY ID

app.get('/listings/:id',(req,res)=>{
    const items=data.find(t=>t.id===parseInt(req.params.id))
    if(!items){
        res.status(404).send({message:'item not found'})
    }
    res.status(201).json({data:listing});
})

//EDIT A LIST ITEM BY ID 

app.put('/listings/:id',(req,res)=>{
    const items=data.find(t=>t.id===parseInt(req.params.id))
    if(!items){
        res.status(404).send({message:'item not found'})
    }
    const{title,description,seller,rating}=req.body;
    items.title=title
    items.description=description
    items.seller=seller
    items.rating=rating
    res.status(201).json({data:listing});
})

//DELETE A LIST ITEM BY ID

app.delete('/listings/:id',(req,res)=>{
    const index=data.find(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        res.status(404).send({message:'item not found'})
    }
    data.splice(index,1)
    res.status(200).send({message:"OK"})
})

//LISTENING TO THE PORT

 app.listen(port,()=>{
    console.log(`app is listening at the port ${port}....`)
 })