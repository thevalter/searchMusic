import { getMusic } from '../../services/axios';
import { useEffect, useState } from 'react';
import { BiSearch } from "react-icons/bi";
import './styles.css';

function Preview() {

  const [data, setData] = useState([] as any);
  const [value, setValue] = useState("");
  const [image, setImage] = useState("");

  const getData = async () => {

    await getMusic(`/search?q=${value}`).then(response => {
      setData(response.data.data[0]);
    });

  }

  const search = async () => {
    await getData();
  }

  useEffect(() => {
    if (data.artist) {
      setImage(`https://e-cdns-images.dzcdn.net/images/artist/${data.md5_image}/1280x720-000000-80-0-0.jpg`);
    }
  }, [search]);

  return (
    <div className='preview' style={data.artist ? {backgroundImage: `url(${data.artist.picture_big})`} : {}}>
      <div>
        <div className='search-field'>
          <input placeholder='Digite o nome da musica...' type="text" value={value} onKeyPress={e => e.key == 'Enter' ? search() : null} onChange={event => setValue(event.currentTarget.value)} />
          <BiSearch onClick={search}/>
        </div>
        <div className='music-result'>
          <audio controls src={data.preview} autoPlay={true} />
        </div>
      </div>
     <div>
      {data.artist ? <h2>{data.title} - {data.artist.name}</h2> : null}
     <img src={image.length > 3 ? image : 'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/musical-colors-chromebook-wallpaper.jpg'} />
     </div>

    </div>
  )
}

export default Preview;