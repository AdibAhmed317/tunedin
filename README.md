# 🎧 TunedIn – YouTube Audio PWA Player

TunedIn is a modern Progressive Web App (PWA) that allows users to stream **YouTube audio-only content** seamlessly. Built with **Next.js (App Router)**, **Tailwind CSS**, **Firebase**, and **PWA support**, it offers features like playlist shuffle, favorite tracking, and responsive music playback.

> ✅ For **personal use only**. Not intended for commercial distribution (to respect YouTube's Terms of Service).

---

## 🚀 Features

- 🔐 Google Sign-In (Firebase Auth)
- 📂 Fetch YouTube Playlists and Videos
- 🎵 Audio-only streaming using `yt-dlp`
- 📱 PWA-enabled: installable, lock-screen playback on iOS Safari
- ❤️ Add/remove favorites (saved in Firestore)
- 🔀 Shuffle full playlists or favorites
- 📻 Bottom navigation with sleek UI
- 🎧 Background audio playback (iPhone Safari compatible)
- 🔄 Autoplay next (shuffled or ordered)

---

## 🧱 Tech Stack

| Layer     | Tech                               |
| --------- | ---------------------------------- |
| Framework | Next.js 15 App Router (Full-stack) |
| Styling   | Tailwind CSS                       |
| Auth      | Firebase Authentication (Google)   |
| Database  | Firebase Firestore                 |
| API       | YouTube Data API v3                |
| Audio     | `yt-dlp` via serverless function   |
| Hosting   | Vercel                             |
| PWA       | `next-pwa` or custom SW            |
