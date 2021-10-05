import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import SignInButton from "../components/SignInButton";
import TrackCard from "../components/TrackCard";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [category, setCategory] = useState("Tracks");
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

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
          setDisplayName("Welcome to Spotify Analytics, " + res.display_name);
        })
        .catch((err) => {
          console.log(err);
          setDisplayName("Welcome to Spotify Analytics");
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
          setTopTracks(res.items);
        })
        .catch((err) => console.log(err));
      axios
        .get("https://api.spotify.com/v1/me/top/artists", {
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
          setTopArtists(res.items);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Spotify Analytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {signedIn ? (
        <div className={styles.signedInContainer}>
          <h1 className={styles.title}>{displayName}</h1>
          <div
            style={{
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            <button
              className={styles.tabs}
              onClick={() => {
                setCategory("Tracks");
              }}
            >
              Top Tracks
            </button>
            <button
              className={styles.tabs}
              onClick={() => {
                setCategory("Artists");
              }}
            >
              Top Artists
            </button>
            <button
              className={styles.tabs}
              onClick={() => {
                setCategory("Upload");
              }}
            >
              Upload Data File
            </button>
          </div>
          {category === "Tracks" ? (
            <div className={styles.gridContainer}>
              {topTracks &&
                topTracks.map((track, index) => (
                  <TrackCard
                    key={track.id}
                    position={index + 1}
                    picture={track.album.images[0].url}
                    name={track.name}
                  />
                ))}
            </div>
          ) : category === "Artists" ? (
            <div className={styles.gridContainer}>
              {topArtists &&
                topArtists.map((artist, index) => (
                  <TrackCard
                    key={artist.id}
                    position={index + 1}
                    picture={artist.images[0].url}
                    name={artist.name}
                  />
                ))}
            </div>
          ) : (
            <div style={{ padding: 10 }}>
              <h1 style={{ fontSize: 36, color: "#FFFFFF" }}>
                This Feature is Coming Soon
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.defaultContainer}>
          <h1 className={styles.title}>Spotify Analytics</h1>
          <SignInButton />
        </div>
      )}
    </>
  );
}
