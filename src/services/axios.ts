import axios from "axios";

export const musicPreview = axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
});

export const musicLyrics = axios.create({
    baseURL: 'https://genius-song-lyrics1.p.rapidapi.com',
});

const configDeezer = {
    headers:{
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

const configGenius = {
    headers:{
        'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
    }
  };

export const getMusic = async (url: string) => {
    return musicPreview.get(url, configDeezer);
};

export const getLyrics = async (url: string) => {
    return musicPreview.get(url, configGenius);
};

