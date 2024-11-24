import express from 'express';

const app=express()
const port=8010;

app.use(express.json())//fetching data in json format
 let data=[]
 let nextid=1;
 app.post('/listings',(req,res)=>{
    const{title,description,seller,rating}=req.body;
    const listing={id:nextid++,title,description,seller,rating};
    data.push(listing);
    res.status(200).send(data)

 });
app.get('/listings',(req,res)=>{
    res.status(200).send(data)
})
app.get('/listings/:id',(req,res)=>{
    const items=data.find(t=>t.id===parseInt(req.params.id))
    if(!items){
        res.status(404).send({message:'item not found'})
    }
    res.status(200).send(items)
})
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
    res.status(200).send(items)
})
app.delete('/listings/:id',(req,res)=>{
    const index=data.find(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        res.status(404).send({message:'item not found'})
    }
    data.splice(index,1)
    res.status(200).send({message:"OK"})
})
 app.listen(port,()=>{
    console.log(`app is listening at the port ${port}....`)
 })