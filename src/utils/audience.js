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

export function audienceListItemText(option) {
  switch (option) {
    case "public":
      return ["Public", "Anyone on or off FriendBook"];
    case "friends":
      return ["Friends", "Your friends on FriendBook"];
    case "friends_except":
      return ["Friends except...", "Friends; Except (list of friends)"];
    case "only_me":
      return ["Only me", "Only me"];
    case "specific_friends":
      return ["Specific friends", "Only show to some friends"];
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