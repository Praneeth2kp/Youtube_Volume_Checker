import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './youtubesearch.css';

function YoutubeVolumeSearch() {
    const [keyword, setKeyword] = useState('Gojo Satoru');
    const [searchResult, setSearchResult] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const handleChange = (event) => {
        setKeyword(event.target.value);
        setError(null);
        setSearchResult(null);
    };

    const handleYearChange = (date) => {
        setSelectedYear(date);
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            setSearchResult(null);

            if (!keyword) {
                setError('Please enter a keyword');
                setLoading(false);
                return;
            }

            if (!selectedYear) {
                setError('Please select a year');
                setLoading(false);
                return;
            }

            let params = {
                q: keyword,
                part: 'snippet',
                type: 'video',
                maxResults: 50,
                key: 'AIzaSyC_rXms59iU06fuQlNrZ8jsrwXooRCp3K0',
            };

            if (selectedYear) {
                const year = selectedYear.getFullYear();
                const fromDate = `${year}-01-01T00:00:00Z`;
                const toDate = `${year + 1}-01-01T00:00:00Z`;
                params.publishedAfter = fromDate;
                params.publishedBefore = toDate;
            }

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                params,
            });

            setSearchResult(response.data.items);
            setTotalResults(response.data.pageInfo.totalResults);
            setLoading(false);
        } catch (error) {
            setError('Error fetching YouTube data');
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='inputsearch'>
                <div className='inputs'>
                    <div className='input-container'>
                        <input
                            type="text"
                            className={`keyword ${keyword ? 'active' : ''}`}
                            placeholder="Enter keyword"
                            value={keyword}
                            onChange={handleChange}
                        />
                        <div className='underline'></div>
                    </div>
                    <div className='input-container'>
                        <DatePicker
                            className={`calender ${selectedYear ? 'active' : ''}`}
                            selected={selectedYear}
                            onChange={handleYearChange}
                            dateFormat="yyyy"
                            showYearPicker
                            scrollableYearDropdown
                        />
                        <div className='underline'></div>
                    </div>
                </div>

                <button onClick={handleSearch} className='search-button'>Search</button>
            </div>
            {loading && <p>Loading....</p>}
            {error && <p>{error}</p>}
            {searchResult && (
                <div>
                    <h2>Search Results:</h2>
                    <h2>Total Videos Found: {totalResults}</h2>
                    <div className="flex-container">
                        {searchResult.map((item) => (
                            <div key={item.id.videoId} className="flex-item">
                                <iframe
                                    width="360"
                                    height="202"
                                    src={`https://www.youtube.com/embed/${item.id.videoId}`}
                                    title={item.snippet.title}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                                <p>{item.snippet.title}</p>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    );
}

export default YoutubeVolumeSearch;
