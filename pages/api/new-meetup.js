import {MongoClient} from 'mongodb'

import dotenv from "dotenv" 
dotenv.config()
//   /api/new-meetup
//Post  /api/new-meetup

async function handler (req,res){
    try{
if(req.method==='POST'){
  const data=req.body;
//Connecting to database
 const client= await MongoClient.connect("mongodb+srv://khan4:Win20030@cluster0.6cquf.mongodb.net/mernapp?retryWrites=true&w=majority")
 const db=client.db();
 if(db){
console.log("DataBase connected")
//After Connecting DataBase accessing the collection inside it wheere we want to store if its not there it will amke it
const meetupCollection=db.collection('meetups');
//InsertOne is the command to insert one new documnet in daatbase colletion
 const result=await meetupCollection.insertOne(data);
 console.log(result);

 //Now closing database coonection
 client.close()
//Now sending response of API after adding data
 res.status(201).json({message:"Meetup Inserted!"})
}//CLOSING IF
else{
    console.log("DataBase error")
}//closing else
} //closing if
 }//closing try
catch(e){
    console.log(e)
}// closing catch
}

export default handler 