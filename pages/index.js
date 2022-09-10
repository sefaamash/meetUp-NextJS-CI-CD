import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { MongoClient } from "mongodb";
import { useState, useEffect, Fragment } from "react";
import Head from "next/head"; //adding meta tags

//how useeffect working?
/*First time when this Home component will render it will return the intial state loadedmeetups means return() part first , after it
then useEffect will render and update that state then this component home will be executed or rendered again and will update the state*/
function Home(props) {
  //the props are used for getstaticfunc
  const [loadedmeetups, setloadedmeetups] = useState([]);
  /*  useEffect(()=>{
     //send a http request to that get api that we make on backend to fetch data from datbase so useefect will work as midleware it will fetch data whenever thi component will render
     setloadedmeetups(dummymeetups);
    },[]);*/
  //here we set the intial stage of loadedmeetups whenevr this component will render useeffect will run send http request to backend api taht fetch data

  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities "
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/*tHE JOB OF THIS FUNCTION IS TO PRE-RENDER OR PREPRARE HTML PAGE or PROPS for (home component function above)FROM SERVER SIDE
Now first this func will render when request is hit after that Home component will render when thsi getstatic function prepare data or props for home function and it will wait until this getstatic will executed or resolve as we use async
The code we write on this function will never execute on client it will onlyvexecute during build process
We use it on the page or component where we want to show fetched dta from the database.
*/
export async function getStaticProps() {
  //Fetching Datafrom database on homepage that we added on newmeetups
  //This is not written in api folder or in seperate file because we want this data to be shown on home route rather than /api/eetup so we use it inside getstaric as it runs on build time on server so first it will connect to db then find the document if its there then it will fetch the data amd provide to home component
  //Connecting to database
  try {
    const client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();
    if (db) {
      console.log("DataBase connected");
      //After Connecting DataBase accessing the collection inside it wheere we want to store if its not there it will amke it
      const meetupCollection = db.collection("meetups");
      //.find will find all the documents in that collection
      const meetups = await meetupCollection.find().toArray();

      //You can do anything here for eg fetch data from Api or hit dataabase (any server side code)
      //After we use this we no longer need use
      return {
        // you need to return a onject in getstatic func and return props for component func that need to be named props
        props: {
          meetups: meetups.map((meetup) => ({
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
            id: meetup._id.toString(),
          })), //here we provide the data taht need to be fetched as props then we return that data as props to our component function
        },
        //10 is the number of seconds nextjs waits for next incoming request foreg  after every 10sec it will again start build or regenerate on the server
        revalidate: 1, // We basically make sure that data is not older than 10sec after we deploy the website
      }; //return ends
    } //if ends
    else {
      console.log("Database Not connected");
    }
  } catch (e) {
    // try ends

    console.log(e);
  } //catch ends
} //func ends

export default Home;
