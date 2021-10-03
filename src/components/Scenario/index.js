import React from 'react';

import './index.css';
import ProfileLink from '../ProfileLink'
import ExitExperiment from './ExitExperiment'

function Scenario() {
  return (
    <div className="Scenario">
      <h3 className="scenario-head">What is my Task ?</h3>

      <p className="scenario-text">You are <strong><ProfileLink name="Alex Doe" /></strong> from Fresno. California and regularly use FriendBook for professional and leisure activities. You are looking for a job and have been advised by your mentor that employers monitor and scrutinize applicants’ FriendBook profile before making decisions on whether to hire them or not. They have provided you with the following <strong> list of items</strong> to consider about your profile as you go through the application process. </p>

      <p className="scenario-task">Given that you have an upcoming interview, go through your profile and see if you are okay with what&apos;s on it.</p>

      <ol className="scenario-list">
        <li className="scenario-list-item tooltip">
          <label>Write a post stating that you are looking for a job</label>
          <span className="tooltiptext"> It’s not uncommon for people to find a job via their social network. Write a post that states your looking for a job to notify your friends about your search. To avoid awkward situations, though, it is probably best not to tell anyone at your current employer about it</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Review your contact information</label>
          <span className="tooltiptext">Make sure you have a professional email address listed (alexdoe@gmail.com) where recruiters can contact you</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Review your profile page</label>
          <span className="tooltiptext">Research shows that recruiters can be biased by things on candidates’ FriendBook profile pages. Think about removing or hiding parts of your profile that may bias a potential recruiter</span>

        </li>

        <li className="scenario-list-item tooltip">
          <label>Remove undesirable personal posts</label>
          <span className="tooltiptext">Revisit your previous posts. Are there any posts that are no longer reflective of who you are as a person?</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Get rid of embarraing posts about you by others</label>
          <span className="tooltiptext">Some of your friends may have tagged you in posts or posted on your timeline embarrassing content about you that you may not want potential employers to see</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label> Limit what other people can post about you</label>
          <span className="tooltiptext">In general, it may make sense to limit the extent to which other people post things about you on FriendBook</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Reduce distractions (chat, invites, etc.)</label>
          <span className="tooltiptext">A job search can be stressful and it is a good idea to remove any distractions, e.g. by limiting invitations, chats, etc</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Get rid of annoying friends</label>
          <span className="tooltiptext">It may also help to get rid of annoying distractions, such as FriendBook friends who post uninteresting or annoying content.</span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Categorize future job contacts</label>
          <span className="tooltiptext">Make sure to keep track of whom among your Friendbook contacts is a recruiter or a potential future colleague
          </span>
        </li>

        <li className="scenario-list-item tooltip">
          <label>Block and/or report abusive friends</label>
          <span className="tooltiptext">If you are being harassed online, is best not to engage. Instead, block and/or report the abusive friend</span>
        </li>
      </ol>

      <div id="experiment-done">
        <ExitExperiment />
      </div>
    </div>
  );
}

export default Scenario;
