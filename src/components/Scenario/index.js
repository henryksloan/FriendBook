import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import './index.css';
import ProfileLink from '../ProfileLink'
import ExitExperiment from './ExitExperiment'

import { registerUser } from '../../api';

function Scenario() {
  let location = useLocation();
  let session_id = new URLSearchParams(location.search).get("session_id");
  let condition = new URLSearchParams(location.search).get("condition");
  useEffect(() => {
    let storage_session_id = localStorage.getItem("session_id");
    if (!storage_session_id && session_id) {
      localStorage.setItem("session_id", session_id);
      storage_session_id = session_id;
    }
    let storage_condition = localStorage.getItem("condition");
    if (!storage_condition && condition) {
      localStorage.setItem("condition", condition);
      storage_condition = condition;
    }

    registerUser();
  }, []);

  return (
    <div className="Scenario">
      <h3 className="scenario-head">What is my Task?</h3>

      <p className="scenario-text">You are <strong><ProfileLink name="alex_doe" /> </strong> from Fresno, California and regularly use FriendBook ( a social media site) for professional and leisure activities. You are planning on applying for a job, go through the posts you have made in the recent past and see if you are okay with them.</p>

      <p className="scenario-task">For each of your posts, you should consider taking any of the following actions based on how you feel or think the post would reflect on you to a potential employer.</p>

      <ol className="scenario-list">
        <li className="scenario-list-item tooltip">
          <label>Delete the post</label>
          <span className="tooltiptext"> It’s not uncommon for people to delete posts that they reflect poorly on them.</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Change the post’s audience </label>
          <span className="tooltiptext"> It’s not uncommon for people to change the audience of their posts to control who can view/access their posts.</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Edit the post </label>
          <span className="tooltiptext">It’s not uncommon for people to edit their posts.</span>

        </li>

      </ol>

      <div id="experiment-done">
        <ExitExperiment />
      </div>
    </div>
  );
}

export default Scenario;
