import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import useRouter from "next/router";
function MeetupItem(props) {
  const router = useRouter; //it will give us acess to all the changing routes whenerver we click on any post and every post have different routes and routes will have therir id's

  function showDetailsHandler() {
    router.push("/" + props.id); //it is equivalent to LInk component that we use it will push the latest post over all the posts that we have clicked before that is also called stack over all the posts
    //router.push takes the routes that we wnat to push
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions} onClick={showDetailsHandler}>
          <button>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
