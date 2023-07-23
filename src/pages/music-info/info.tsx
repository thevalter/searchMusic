import { useState } from 'react';
import { getLyrics } from '../../services/axios';
import { BiSearch } from "react-icons/bi";
import './styles.css';

const Info = () => {

    const [data, setData] = useState("");
    const [value, setValue] = useState("");

    const getData = async () => {

        await getLyrics(`/search/?q=${value}`).then(async (response) => {
            await getLyrics(`/song/lyrics/?id=${response.data.hits[0].result.id}`).then(res => {
                setData(res.data.lyrics.lyrics.body.html);
            });
        });

    }

    const search = async () => {
        await getData();
    }

    function createMarkup() {
        return { __html: data };
    }

    return (
        <div className='info'>
            <div className='search-field'>
                <input placeholder='Digite o nome da musica...' type="text" value={value} onKeyPress={e => e.key == 'Enter' ? search() : null} onChange={event => setValue(event.currentTarget.value)} />
                <BiSearch onClick={search} />
            </div>
            <div className='content' dangerouslySetInnerHTML={createMarkup()}>
            </div>
        </div>

    )
}

export default Info;