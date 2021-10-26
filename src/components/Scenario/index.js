import React from 'react';

import './index.css';
import ProfileLink from '../ProfileLink'
import ExitExperiment from './ExitExperiment'

function Scenario() {
  return (
    <div className="Scenario">
      <h3 className="scenario-head">What is my Task ?</h3>

      <p className="scenario-text">You are <strong><ProfileLink name="alex_doe"/> </strong> from Fresno. California and regularly use FriendBook ( a social media site) for professional and leisure activities. You are planning on applying for a job, go through the posts you have made in the recent past and see if you are okay with them.</p>

      <p className="scenario-task">For each of your posts, you could consider taking any of the following actions based on how you feel or think the post would reflect on you to a potential employer.</p>

      <ol className="scenario-list">
        <li className="scenario-list-item tooltip">
          <label>Deleting the post</label>
          <span className="tooltiptext"> It’s not uncommon for people to delete posts that they think would reflect poorly on them.</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Change your post’s audeince </label>
          <span className="tooltiptext"> It’s not uncommon for people to change the audience of their post to control who can view/access their posts.</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Edit your post entirely</label>
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
