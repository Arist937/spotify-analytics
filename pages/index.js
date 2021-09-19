import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import SignInButton from "../components/SignInButton";
import TrackCard from "../components/TrackCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    const access_token = new URLSearchParams(window.location.hash).get(
      "#access_token"
    );

    if (access_token) {
      setSignedIn(true);
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + access_token, //the token is a variable which holds the token
          },
        })
        .then((response) => {
          const res = response.data;
          setDisplayName(res.display_name);
        });

      axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: "Bearer " + access_token, //the token is a variable which holds the token
          },
          params: {
            time_range: "long_term",
            limit: "50",
          },
        })
        .then((response) => {
          const res = response.data;
          console.log(res);
          setTopTracks(response.data.items);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify Analytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {signedIn ? (
        <>
          <h1 className={styles.title}>{displayName}</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto auto",
              gap: "20px 20px",
              padding: 10,
            }}
          >
            {topTracks &&
              topTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  picture={track.album.images[0].url}
                  name={track.name}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className={styles.title}>Welcome to Spotify Analytics</h1>
          <SignInButton />
        </>
      )}
    </div>
  );
}
