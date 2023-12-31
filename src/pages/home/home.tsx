import { useState } from 'react';
import { getLyrics, getMusic } from '../../services/axios';
import { BiSearch } from "react-icons/bi";
import Spinner from '../../components/spinner/spinner';
import './styles.css';

const Home = () => {
  const [lyrics, setLyrics] = useState("");
  const [preview, setPreview] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");
  const [info, setInfo] = useState([] as any);

  const getData = async () => {

    await getMusic(`/search?q=${value}`).then(response => {
      setPreview(response.data.data[0].preview);
      setImage(`https://e-cdns-images.dzcdn.net/images/artist/${response.data.data[0].md5_image}/1280x1280-000000-80-0-0.jpg`);
    });

    await getLyrics(`/search/?q=${value}`).then(async (response) => {
      await getLyrics(`/song/lyrics/?id=${response.data.hits[0].result.id}`).then(res => {
        setLyrics(res.data.lyrics.lyrics.body.html);
      });
      await getLyrics(`/song/details/?id=${response.data.hits[0].result.id}`).then(res => {
        setInfo(res.data.song);
      });
    });

  }

  const search = async () => {
    await getData();
  }

  return (
    <div className='main'>
      <div className='search-field'>
        <input placeholder='Digite o nome da musica...' type="text" value={value} onKeyPress={e => e.key == 'Enter' ? search() : null} onChange={event => setValue(event.currentTarget.value)} />
        <BiSearch onClick={search} />
      </div>
      {preview.length > 3 ? <div className='music-result'>
        <h1>{info.title}</h1>
        {image.length > 3 ? <img src={image} /> : <Spinner/>}
        {preview ? <audio controls src={preview} /> : <Spinner/>}
        {info.description ? <div dangerouslySetInnerHTML={{ __html: info.description.html}}></div> : <Spinner/>}
      </div> : null}
      <div className='content' dangerouslySetInnerHTML={{ __html: lyrics }}>
      </div>
    </div>

  )
}

export default Home;