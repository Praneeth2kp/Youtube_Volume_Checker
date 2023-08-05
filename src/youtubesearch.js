import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './youtubesearch.css';

function YoutubeVolumeSearch() {
    const [keyword, setKeyword] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [videoStatsPerMonth, setVideoStatsPerMonth] = useState([]);

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
            setVideoStatsPerMonth([]);

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

            const year = selectedYear.getFullYear();

            let params = {
                q: keyword,
                part: 'snippet',
                type: 'video',
                maxResults: 50,
                key: 'AIzaSyCJr0tj--OThVpP7wYX4yLhE3hTrm43Av8',
            };

            const videoStats = [];
            for (let month = 0; month < 12; month++) {
                const fromDate = new Date(year, month, 1);
                const toDate = new Date(year, month + 1, 1);
                params.publishedAfter = fromDate.toISOString();
                params.publishedBefore = toDate.toISOString();
                const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                    params,
                });
                videoStats.push({ month: fromDate.toLocaleString('default', { month: 'long' }), count: response.data.pageInfo.totalResults });
            }

            setVideoStatsPerMonth(videoStats);

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
            <h1 style={{ textAlign: 'center', color: 'White' }}>Youtube Search Volume Application</h1>
            <div className='group-1'>
                <div className='inner-group-1'>
                    <input
                        type="text"
                        className="keyword"
                        placeholder="Enter keyword"
                        value={keyword}
                        onChange={handleChange}
                    />
                    <div style={{ width: '270px' }}>
                        <DatePicker
                            className="calender"
                            placeholderText='YYYY'
                            selected={selectedYear}
                            onChange={handleYearChange}
                            dateFormat="yyyy"
                            showYearPicker
                            scrollableYearDropdown
                        />
                    </div>
                </div>
                <div>
                    <button onClick={handleSearch} className="search-button"> Search</button>
                </div>
            </div>

            {loading && <p>Loading...</p>}

            {error && <p>{error}</p>}

            {searchResult && (
                <div>
                    <h2>Total Videos Found: {totalResults}</h2>
                    <h2>Video Uploads per Month:</h2>
                    <div className='flexed'>
                        <div className="video-stats">
                            {videoStatsPerMonth.map((stat) => (
                                <p key={stat.month}>
                                    {stat.month}: {stat.count}
                                </p>
                            ))}
                        </div>
                    </div>

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
