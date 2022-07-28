import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import  useRouter  from "next/router";

function newMeetupPage(){
    //USE ROUTER IS USED TO GET ACCESS TO URL PARTS OR COMPLETE URL
   const router= useRouter;
   async function addMeetupHandler(enteredmeetupData){
   //Now we are fetching the data from that api we make in api/new-meetup folder to amke api where we adding meetup info to database
    const response=await fetch('/api/new-meetup',{
        method:'POST',
        //as response will be in json format so we convert our data to json with .stringify
        body:JSON.stringify(enteredmeetupData),
        //headers configure our request
        headers:{
            'Content-Type':'application/json'}
 })//fetch ends

 //After getting response we can get the response in json format and can work with that data
 const data=await response.json();
 console.log(data)

 //AFTER INSERTING DATA I DONT WONT TO RMAIN ON THAT PAGE BUT TO COME ON THE HOMEPAGE OF APP SO WE USE
router.push('/')

}
    return <NewMeetupForm onAddMeetup={addMeetupHandler}/>

}

export default newMeetupPage;