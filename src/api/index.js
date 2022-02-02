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

export function registerAction(post_id, action, details, suggestion = false, suggestion_action) {
  let session_id = localStorage.getItem("session_id");

  const suggestion_label = suggestion_action ? `_${suggestion_action}` : '';
  const target_id = `p${post_id}` + (suggestion ? `_suggestion${suggestion_label}_${action}` : '');

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development
    fetch(`http://localhost:8081?session_id=${session_id}&target_id=${target_id}&action_type=${action}&details=${details || ""}`)
      .catch(error => console.log(error));
  } else {
    // Production
    fetch(`https://us-central1-friendbook-328622.cloudfunctions.net/registerAction?session_id=${session_id}&target_id=${target_id}&action_type=${action}&details=${details || ""}`)
      .catch(error => console.log(error));
  }
}

export async function registerExit(callback) {
  let session_id = localStorage.getItem("session_id");
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development
    await fetch(`http://localhost:8082?session_id=${session_id}`)
      .catch(error => console.log(error))
      .then(callback);
  } else {
    // Production
    await fetch(`https://us-central1-friendbook-328622.cloudfunctions.net/registerExit?session_id=${session_id}`)
      .catch(error => console.log(error))
      .then(callback);
  }
}