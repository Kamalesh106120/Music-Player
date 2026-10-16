# Music Player

A responsive front-end music player built with HTML, CSS and vanilla JavaScript.

## Features

- Play and pause
- Next and previous song
- Seekable progress bar with current time and duration
- Volume control
- Song title and artist display
- Clickable playlist
- Autoplay of the next song when one ends
- Keyboard accessible and mobile friendly

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Add your own songs

1. Put audio files in the `songs` folder.
2. Add an entry to the `songs` array in `script.js` with `title`, `artist`, `src` and `color`.

## Deploy with GitHub Pages

1. Push the project to a GitHub repository.
2. Open Settings, then Pages.
3. Choose the main branch and the root folder, then save.

## Project structure

```
music-player/
  index.html
  style.css
  script.js
  songs/
  README.md
```

The demo tracks in `songs` are original synthesized melodies generated for this project.
