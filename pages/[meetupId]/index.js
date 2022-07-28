import { Fragment } from "react"
import MeetUpDetail from "../../components/meetups/meetupDetail"
import {MongoClient,ObjectId} from 'mongodb'
 //adding meta tags
 //Meta tags are important because they impact how your site appears in the SERPs and how many people will be inclined to click through to your website. They will therefore impact your traffic and engagement rates, which can impact your SEO and rankings. Meta tags are an important part of a solid SEO strategy.
import Head from "next/head"
function MeetUpDetails(props){
return (
<Fragment>

    <Head>
        <title>{props.meetupData.title}</title>
        <meta  
        name='description'
        content={props.meetupData.description}/>
    </Head>
<MeetUpDetail 
image={props.meetupData.image}
title={props.meetupData.title}
address={props.meetupData.address}
description={props.meetupData.description}
/>
</Fragment>
)
}
// If u r using getstatic prop on any page and that page is dynamic(changing everytime) then u have to use getstaticPath too
//Now as this post  is changing continuosly next js wouldnt know for which post it have to pre-generate html oage or pre-render so this getStatic path is used to generate pre-render for each post wwith their Id
export async function getStaticPaths(){
    try{
       //Connecting to database
 const client= await MongoClient.connect('mongodb+srv://khan4:Win20030@cluster0.6cquf.mongodb.net/mernapp?retryWrites=true&w=majority')
 const db=client.db();
 if(db){
console.log("DataBase connected")
//After Connecting DataBase accessing the collection inside it wheere we want to store if its not there it will amke it
const meetupCollection=db.collection('meetups');
 //.find will find all the documents in that collection
 const meetups=await meetupCollection.find({},{_id:1}).toArray(); //in .find({},{_id:1}) first braket if remain empty then we r telling that find all data from database, if we write fields there then it will extract only that ,and second{} tells taht find all if empty if we write ) _id:1 means we want only id field from document
return{
    /*this fallback is used when u tell nextjs that ur path have all the defined values or not all values are defined
    (for not-defined we set true if this used then whateverid user enter or used it will generate that ) and for(all supported defined we use false) so if user enter anything that is not present
    than he/she will get 404 error*/
    fallback:false,
    paths:meetups.map(meetup=>({
        params:{ meetupId:meetup._id.toString()}
    }))
}// return
}//CLOSING IF
else{
    console.log("DataBase error")
}//closing else
}//try ends

catch(e){
    console.log(e)
}//catch ends

}


export async function getStaticProps(context) {
 
        //context we can also use in getstatic and .params have all the acess to url
        //with context we can acees params and meetrupId is the [meetupId] that will be generated from database this will give it that id and store in meetupId var
        const meetupId=  context.params.meetupId; //meetupID is the filename [meetupId] we use in /w square bracxkets
        //Connecting to database
  const client= await MongoClient.connect('mongodb+srv://khan4:Win20030@cluster0.6cquf.mongodb.net/mernapp?retryWrites=true&w=majority')
  const db=client.db();
 console.log("DataBase connected")
 //After Connecting DataBase accessing the collection inside it wheere we want to store if its not there it will amke it
  const meetupCollection=db.collection('meetups');
  //.findOne will find only 1 document with specific field like here we are finding with id
  const Selectedmeetup=await meetupCollection.findOne({_id:ObjectId(meetupId)}); //as our meetupid that we are gettimg fro params is in string so in Mongodb there is Object id we can wrap our meetupId in ObjectId
  return{
props:{
           meetupData:{
            id:Selectedmeetup._id.toString(),
            title:Selectedmeetup.title,
            image:Selectedmeetup.image,
            address:Selectedmeetup.address,
            description:Selectedmeetup.description
           }},
      
       revalidate:1 ,
   
 }

 
    //context we can also use in getstatic and .params have all the acess to url
}
export default MeetUpDetails;