import { Fragment } from "react";
import classes from "./meetupDetail.module.css";
import Card from "../ui/Card";
function MeetUpDetail(props) {
  return (
    <Card>
      <section className={classes.detail}>
        <img src={props.image} alt="" />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description};</p>
      </section>
    </Card>
  );
}

export default MeetUpDetail;
