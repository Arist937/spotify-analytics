export default function handler(req, res) {
  const clientId = "798b441bf3414b33887b1fa834fb5dc7";
  // https://spotify-analytics.vercel.app/
  const redirectUri = encodeURI("https://spotify-analytics.vercel.app/");
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&show_dialog=true&scope=user-read-private%20user-read-email%20user-top-read`;

  res.send(url);
}
