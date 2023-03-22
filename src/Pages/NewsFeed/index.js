import React, { useState } from 'react'
import Select from 'react-select'


const selectBySource = [
    { value: 'opennews', label: 'OpenNews' },
    { value: 'bbcnews', label: 'BBC News' },
    { value: 'newscred', label: 'NewsCred' },
]
const selectByCatagory = [
    { value: 'sports', label: 'Sports' },
    { value: 'travel', label: 'Travel' },
    { value: 'culture', label: 'Culture' },
]
const selectByAuthor = [
    { value: 'opennews', label: 'OpenNews' },
    { value: 'bbcnews', label: 'BBC News' },
    { value: 'newscred', label: 'NewsCred' },
]


const NewsFeed = () => {
    const [selectedCatagory, setselectedCatagory] = useState("");
    const [selectedAuthor, setselectedAuthor] = useState("");
    const [selectedSource, setselectedSource] = useState("");

    return (
        <div className='news-feed'>
            <div className='d-flex align-items-center justify-content-between gap-16px flex-md-row flex-column'>
                <div className='form-control'>
                    <label>Select by Sources</label>
                    <Select
                        defaultValue={selectBySource[0]}
                        options={selectBySource}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => setselectedCatagory(choice.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Catagory</label>
                    <Select
                        defaultValue={selectByCatagory[0]}
                        options={selectByCatagory}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => setselectedSource(choice.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Select by Aurthor</label>
                    <Select
                        defaultValue={selectByAuthor[0]}
                        options={selectByAuthor}
                        className="select-react"
                        isClearable={false}
                        onChange={(choice) => setselectedAuthor(choice.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewsFeed