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
