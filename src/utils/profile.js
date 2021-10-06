import alex_profile_img from '../assets/users/alex_profile_img.jpg';
import bill_profile_img from '../assets/users/bill_profile_img.jpg';
import coke_profile_img from '../assets/users/coke_profile_img.jpg';
import esther_profile_img from '../assets/users/esther_profile_img.jpg';
import ira_profile_img from '../assets/users/ira_profile_img.jpg';
import jack_profile_img from '../assets/users/jack_profile_img.jpg';
import jim_profile_img from '../assets/users/jim_profile_img.jpg';
import kyle_profile_img from '../assets/users/kyle_profile_img.jpg';
import loren_profile_img from '../assets/users/loren_profile_img.jpg';
import lydia_profile_img from '../assets/users/lydia_profile_img.jpg';
import sasha_profile_img from '../assets/users/sasha_profile_img.jpg';
import starbucks_profile_img from '../assets/users/starbucks_profile_img.jpg';
import tanya_profile_img from '../assets/users/tanya_profile_img.jpg';
import trevin_profile_img from '../assets/users/trevin_profile_img.jpg';
import vice_profile_img from '../assets/users/vice_profile_img.jpg';

const profilePics = {
  'alex_doe': alex_profile_img,
  'bill_gates': bill_profile_img,
  'coca_cola': coke_profile_img,
  'esther_rorgash': esther_profile_img,
  'ira_slipan': ira_profile_img,
  'jack_scout': jack_profile_img,
  'jim_mend': jim_profile_img,
  'kyle_parker': kyle_profile_img,
  'loren_payton': loren_profile_img,
  'lydia_chopover': lydia_profile_img,
  'sasha_riley': sasha_profile_img,
  'starbucks': starbucks_profile_img,
  'tanya_strotman': tanya_profile_img,
  'trevin_noushy': trevin_profile_img,
  'vice_news': vice_profile_img
};

const defaultProfilePic = 'default_profile_img.jpg';

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

export function getProfilePic(name) {
  return profilePics[name] || defaultProfilePic;
}

export function getFullName(name) {
  return fullNames[name];
}

export function replaceNamesWithLinks(text, excludeUser = false) {
  // TODO: Implement
  if (excludeUser) {
    console.log(allFullNames);
    return text;
  } else {
    return text;
  }
}
