import React from 'react';
import ProfileLink from '../components/ProfileLink';

const mainUser = 'alex_doe';
export const friendList = [
  'bill_gates',
  'coca_cola',
  'esther_rorgash',
  'ira_slipan',
  'jack_scout',
  'jim_mend',
  'kyle_parker',
  'loren_payton',
  'lydia_chopover',
  'sasha_riley',
  'starbucks',
  'tanya_strotman',
  'trevin_noushy',
  'vice_news'];

const profilePics = {
  'alex_doe': process.env.PUBLIC_URL + '/assets/users/alex_profile_img.jpg',
  'bill_gates': process.env.PUBLIC_URL + '/assets/users/bill_profile_img.jpg',
  'coca_cola': process.env.PUBLIC_URL + '/assets/users/coke_profile_img.jpg',
  'esther_rorgash': process.env.PUBLIC_URL + '/assets/users/esther_profile_img.jpg',
  'ira_slipan': process.env.PUBLIC_URL + '/assets/users/ira_profile_img.jpg',
  'jack_scout': process.env.PUBLIC_URL + '/assets/users/jack_profile_img.jpg',
  'jim_mend': process.env.PUBLIC_URL + '/assets/users/jim_profile_img.jpg',
  'kyle_parker': process.env.PUBLIC_URL + '/assets/users/kyle_profile_img.jpg',
  'loren_payton': process.env.PUBLIC_URL + '/assets/users/loren_profile_img.jpg',
  'lydia_chopover': process.env.PUBLIC_URL + '/assets/users/lydia_profile_img.jpg',
  'sasha_riley': process.env.PUBLIC_URL + '/assets/users/sasha_profile_img.jpg',
  'starbucks': process.env.PUBLIC_URL + '/assets/users/starbucks_profile_img.jpg',
  'tanya_strotman': process.env.PUBLIC_URL + '/assets/users/tanya_profile_img.jpg',
  'trevin_noushy': process.env.PUBLIC_URL + '/assets/users/trevin_profile_img.jpg',
  'vice_news': process.env.PUBLIC_URL + '/assets/users/vice_profile_img.jpg'
};

const defaultProfilePic = process.env.PUBLIC_URL + '/assets/users/default_profile_img.jpg'

const fullNames = {
  'alex_doe': "Alex Doe",
  'bill_gates': "Bill Gates",
  'coca_cola': "The Coca-Cola Company",
  'esther_rorgash': "Esther Rorgash",
  'ira_slipan': "Ira Slipan",
  'jack_scout': "Jack Scout",
  'jim_mend': "Jim Mend",
  'kyle_parker': "Kyle Parker",
  'loren_payton': "Loren Payton",
  'lydia_chopover': "Lydia Chopover",
  'sasha_riley': "Sasha Riley",
  'starbucks': "Starbucks",
  'tanya_strotman': "Tanya Strotman",
  'trevin_noushy': "Trevin Noushy",
  'vice_news': "VICE News"
};

export const allFullNames = Object.values(fullNames);

const fullNameRegex = RegExp(allFullNames
  .map(str => `(${str})`).join('|'), 'gi');
const fullNameExcludingUserRegex = RegExp(allFullNames
  .filter(str => str != mainUser)
  .map(str => `(${str})`).join('|'), 'gi');

export function getProfilePic(name) {
  return profilePics[name] || defaultProfilePic;
}

export function getFullName(name) {
  return fullNames[name];
}

export function getIdFromFullName(fullName) {
  return Object.keys(fullNames).find(key => fullNames[key] === fullName);
}

export function replaceNamesWithLinks(text, excludeUser = false) {
  const regex = excludeUser ? fullNameRegex : fullNameExcludingUserRegex;
  const matches = [...text.matchAll(regex)];

  let output = [];
  let startIndex = 0;
  for (const [index, match] of matches.entries()) {
    const matchStart = match.index;
    const matchEnd = match.index + match[0].length;

    output.push(<span key={`${index}_before`}>{text.substring(startIndex, matchStart)}</span>)
    output.push(<ProfileLink name={getIdFromFullName(match[0])} key={`${index}_link`} />);

    startIndex = matchEnd;
  }
  output.push(<span key={'after'}>{text.substring(startIndex)}</span>)

  return <span>{output}</span>;
}
