import public_icon from '../assets/icons/audience/public.png';
import friends_icon from '../assets/icons/audience/friends.png';
import friends_except_icon from '../assets/icons/audience/friends_except.png';
import specific_friends_icon from '../assets/icons/audience/specific_friends.png';
import only_me_icon from '../assets/icons/audience/only_me.png';
import custom_icon from '../assets/icons/audience/custom.png';

export function audienceText(audience) {
  switch (audience) {
    case "public":
      return "Public";
    case "friends":
      return "Friends";
    case "friends_except":
      return "Friends except...";
    case "only_me":
      return "Only Me"
    case "specific_friends":
      return "Specific Friends"
    case "custom":
      return "Custom"
    case "family":
      return "Family"
    default:
      return audience || " ";
  }
}

export function audienceIcon(audience) {
  switch (audience) {
    case "public":
      return public_icon;
    case "friends":
      return friends_icon;
    case "friends_except":
      return friends_except_icon;
    case "only_me":
      return only_me_icon;
    case "specific_friends":
      return specific_friends_icon;
    case "custom":
      return custom_icon;
  }
}

export function audienceListItemText(option) {
  switch (option) {
    case "public":
      return ["Public", "Anyone on or off FriendBook"];
    case "friends":
      return ["Friends", "Your friends on FriendBook"];
    case "friends_except":
      // TODO: Replace with relevant list of friends (given post ID)
      return ["Friends except...", "Friends; Except (list of friends)"];
    case "only_me":
      return ["Only me", ""];
    case "specific_friends":
      // TODO: Replace with relevant list of friends (given post ID)
      return ["Specific friends", "(list of friends"];
    case "custom":
      return ["Custom", "Include and exclude friends and lists"];
    case "everyone":
      return ["Everyone", ""];
    case "friends_of_friends":
      return ["Friends of friends", ""];
    case "enabled":
      return ["Enabled", ""];
    case "disabled":
      return ["Disabled", ""];
    default:
      return [option, ""];
  }
}