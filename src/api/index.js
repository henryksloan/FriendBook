export function registerUser() {
  let session_id = localStorage.getItem("session_id");
  let condition = localStorage.getItem("condition");
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development
    fetch(`http://localhost:8080?session_id=${session_id}&condition=${condition}`)
      .catch(error => console.log(error));
  } else {
    // Production
    fetch(`https://us-central1-friendbook-328622.cloudfunctions.net/registerUser?session_id=${session_id}&condition=${condition}`)
      .catch(error => console.log(error));
  }
}

export function registerAction(post_id, action, details, suggestion = false) {
  let session_id = localStorage.getItem("session_id");

  const target_id = `p${post_id}` + (suggestion ? `_suggestion_${action}` : '');

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development
    fetch(`http://localhost:8081?session_id=${session_id}&target_id=${target_id}&action=${action}&details=${details || ""}`)
      .catch(error => console.log(error));
  } else {
    // Production
    fetch(`https://us-central1-friendbook-328622.cloudfunctions.net/registerAction?session_id=${session_id}&target_id=${target_id}&action=${action}&details=${details || ""}`)
      .catch(error => console.log(error));
  }
}