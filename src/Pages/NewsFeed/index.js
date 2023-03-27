import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import noImage from '../../Assets/Images/noImage.jpg'


const selectBySource = [
    { value: 'news', label: 'NewsAPI' },
    { value: 'NYTnews', label: 'NYTnews' },
    { value: 'newscred', label: 'NewsCred' },
]
const selectByCatagory = [
    { value: 'business', label: 'business' },
    { value: 'entertainment', label: 'entertainment' },
    { value: 'general', label: 'general' },
    { value: 'health', label: 'health' },
    { value: 'science', label: 'science' },
    { value: 'sports', label: 'sports' },
    { value: 'technology', label: 'technology' },
]
const selectByCatagoryS2 = [
    { value: 'arts', label: 'arts' },
    { value: 'home', label: 'home' },
    { value: 'science', label: 'science' },
    { value: 'us', label: 'us' },
    { value: 'world', label: 'world' },
]

const NewsFeed = () => {

    const [selectedAuthor, setselectedAuthor] = useState('');
    const [selectedSource, setselectedSource] = useState("news");
    const [selectedCatagory, setselectedCatagory] = useState('');
    const [loading, setloading] = useState(false);
    const [authors, setAuthors] = useState([]);
    const [getNews, setGetNews] = useState([]);


    const [api_url, setapi_url] = useState('http://127.0.0.1:8000/api/news');
    const getNewsData = async () => {
        try {
            const fetchData = await axios.get(api_url)
            setGetNews(fetchData.data)
            setloading(true)
            console.log(fetchData.data)

        } catch (error) {
            setloading(true)
            console.log(error)
            alert("Failed to process");
            setGetNews(null)

        }
    }
    const getAuthor = async () => {
        try {
            const fetchData = await axios.get(`http://localhost:8000/api/author/${selectedCatagory}`)
            const finalauthors = await fetchData;
            const data = finalauthors.data.map((data) => {
                return {
                    label: data,
                    value: data
                }
            })
            setAuthors(data)
            console.log(fetchData.data, "authots")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAuthor()
    }, [selectedAuthor, selectedCatagory])

    useEffect(() => {
        getNewsData()
    }, [api_url])


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
                            setapi_url(`http://127.0.0.1:8000/api/${choice.value}`)
                            setloading(false)
                        }}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Category</label>
                    <Select
                        options={selectedSource === "news" ? selectByCatagory : selectByCatagoryS2}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => {
                            setselectedCatagory(choice.value)
                            setapi_url(`http://127.0.0.1:8000/api/${selectedSource}/${choice.value}${selectedAuthor ? `/${selectedAuthor}` : ''}`)
                            setloading(false)
                        }}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Aurthor</label>
                    <Select
                        options={authors}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => {
                            setselectedAuthor(choice.value)
                            setapi_url(`http://127.0.0.1:8000/api/${selectedCatagory ? selectedSource : 'newsbyAuthor'}${selectedCatagory ? `/${selectedCatagory}` : ''}/${choice.value.replace(/\s/g, '_')}`)
                            setloading(false)
                        }}
                    />
                </div>
            </div>

            <div className='row m-0 pt-5'>
                {loading && (getNews?.articles || []).map((data, index) => {
                    {/* const imgUrl = data?.media[0]?.['media-metadata'][2]?.url;
                    const imgUrl2 = data?.multimedia[1]?.url;
                    console.log(imgUrl)
                    console.log(imgUrl2) */}

                    return (
                        <div className=' col-lg-4 col-md-6 col-12 p-0 pb-3 news' key={index}>
                            <div className='card-main'>
                                <div className='card-info '>
                                    <div>
                                        <div className='card-header bg-transparent px-0 pt-0'>
                                            <h3 className='font-20 font-weight-700'>{data.title}</h3>
                                        </div>
                                        <div className=''>
                                            {selectedSource === "news" ? <img src={data?.urlToImage || noImage} alt='' className='w-100 my-3 rounded-8px' /> : ''}
                                            {selectedSource === "NYTnews" ? <> {!selectedCatagory ? <img src={data?.media[0]?.['media-metadata'][2]?.url || noImage} alt='' className='w-100 my-3 rounded-8px' /> : <img src={data?.multimedia[1]?.url || noImage} alt='' className='w-100 my-3 rounded-8px' />}</> : ''}
                                            {/* {selectedSource === "NYTnews" ? <img src={data?.multimedia[1]?.url || noImage} alt='' className='w-100 my-3 rounded-8px' /> : ''} */}


                                            <div className='news-content'>
                                                <p className='font-14 text-blackish font-weight-500 news-content'>{data.content || data.abstract || 'Content not available!!!'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a href={data.url} target="_blank" rel="noreferrer" className="text-blue font-weight-600"><u>View more</u></a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='row m-0 pt-5'>
                {getNews && selectedAuthor && <div className=' col-lg-4 col-md-6 col-12 p-0 pb-3 news' >
                    <div className='card-main'>
                        <div className='card-info '>
                            <div>
                                <div className='card-header bg-transparent px-0 pt-0'>
                                    <h3 className='font-20 font-weight-700'>{getNews[0]?.title}</h3>
                                </div>
                                <div className=''>
                                    <img src={getNews[0]?.urlToImage || noImage} alt='' className='w-100 my-3 rounded-8px' />
                                    <div className='news-content'>
                                        <p className='font-14 text-blackish font-weight-500 news-content'>{getNews[0]?.content || 'Content not available!!!'}</p>
                                    </div>
                                </div>
                            </div>
                            <a href={getNews[0]?.url} target="_blank" rel="noreferrer" className="text-blue font-weight-600"><u>View more</u></a>
                        </div>
                    </div>
                </div>}
            </div>

        </div>
    )
}

export default NewsFeed