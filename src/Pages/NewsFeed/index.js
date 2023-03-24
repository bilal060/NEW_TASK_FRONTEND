import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import noImage from '../../Assets/Images/noImage.jpg'


const selectBySource = [
    { value: 'getnewsapi', label: 'NewsAPI' },
    { value: 'opennews', label: 'OpenNews' },
    { value: 'newscred', label: 'NewsCred' },
]
const selectByCatagory = [
    { value: '', label: 'All Categories' },
    { value: 'business', label: 'business' },
    { value: 'entertainment', label: 'entertainment' },
    { value: 'general', label: 'general' },
    { value: 'health', label: 'health' },
    { value: 'science', label: 'science' },
    { value: 'sports', label: 'sports' },
    { value: 'technology', label: 'technology' },

]
const selectByAuthor = [
    { value: 'opennews', label: 'OpenNews' },
    { value: 'bbcnews', label: 'BBC News' },
    { value: 'newscred', label: 'NewsCred' },
]

const APIURl = process.env.REACT_APP_API_URL;


const NewsFeed = () => {

    const [selectedAuthor, setselectedAuthor] = useState('');
    const [selectedSource, setselectedSource] = useState("getnewsapi");
    const [selectedCatagory, setselectedCatagory] = useState('');
    const [loading, setloading] = useState(false);

    console.log(APIURl, "api")

    const [api_url, setapi_url] = useState('http://127.0.0.1:8000/api/getnewsapi');
    const [getNews, setGetNews] = useState([]);

    const getNewsData = async () => {
        try {
            const fetchData = await axios.get(api_url)
            setGetNews(fetchData.data)
            setloading(true)
        } catch (error) {
            setloading(true)
            console.log(error)
        }
    }
    useEffect(() => {
        getNewsData()
        window.addEventListener('load', getNewsData)
        return () => {
            window.removeEventListener('load', getNewsData)
        }
    }, [api_url])
    console.log(api_url)


    // const filterSource = (source) => {
    //     console.log(api_url)
    //     setselectedSource(source);
    //     setapi_url(`http://127.0.0.1:8000/api/${selectedSource}`);
    //     getNewsData();
    // }
    // const filterCatagory = (source) => {
    //     console.log(api_url)
    //     setselectedCatagory(source);
    //     setapi_url(`http://127.0.0.1:8000/api/${selectedSource}/${selectedCatagory}`);
    //     getNewsData();
    // }
    return (
        <div className='news-feed'>
            {!loading &&
                <div className='loader'>
                </div>
            }
            <div className='d-flex align-items-center justify-content-between gap-16px flex-md-row flex-column'>
                <div className='form-control'>
                    <label>Select by Sources</label>
                    <Select
                        defaultValue={selectBySource[0]}
                        options={selectBySource}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => {
                            setselectedSource(choice.value)
                            setapi_url(`http://127.0.0.1:8000/api/${choice.value}/${selectedCatagory}`)
                            setloading(false)
                            console.log(choice)
                        }}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Category</label>
                    <Select
                        options={selectByCatagory}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => {
                            setselectedCatagory(choice.value)
                            setapi_url(`http://127.0.0.1:8000/api/${selectedSource}/${choice.value}`)
                            setloading(false)
                        }}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Aurthor</label>
                    <Select
                        options={selectByAuthor}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => setselectedAuthor(choice.value)}
                    />
                </div>
            </div>
            <div className='row m-0 pt-5'>
                {loading && (getNews.articles || []).map((nft, index) => {
                    return (
                        <div className=' col-lg-4 col-md-6 col-12 p-0 pb-3 news' key={index}>
                            <div className='card-main'>
                                <div className='card-info '>
                                    <div>
                                        <div className='card-header bg-transparent px-0 pt-0'>
                                            <h3 className='font-20 font-weight-700'>{nft.title}</h3>
                                        </div>
                                        <div className=''>
                                            <img src={nft?.urlToImage || noImage} alt='' className='w-100 my-3 rounded-8px' />
                                            <div className='news-content'>
                                                <p className='font-14 text-blackish font-weight-500 news-content'>{nft.content || 'Content not available!!!'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href={nft.url} target="_blank" rel="noreferrer" className="text-blue font-weight-600"><u>View more</u></a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewsFeed