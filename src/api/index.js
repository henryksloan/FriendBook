export function cloudFunctionTest(session_id, condition) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // Development
    fetch(`http://localhost:8080?session_id=${session_id}&condition=${condition}`)
      .catch(error => console.log(error));
  } else {
    // Production
    fetch('https://us-central1-friendbook-328622.cloudfunctions.net/helloGET')
      .then(res => res.text())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
}