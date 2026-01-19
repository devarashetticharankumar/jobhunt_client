import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns"; // Import for relative time formatting
import { Helmet } from "react-helmet-async";

const YouTubeHome = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const API_KEY = "AIzaSyCh74rye_2wrFfhpSxXi9vx0-SB4XN7e0E";

  const fetchVideos = async (query = "", pageToken = "") => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = query
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}&pageToken=${pageToken}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=US&key=${API_KEY}&pageToken=${pageToken}`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.items) {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
      } else {
        throw new Error("No videos found");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchVideos(searchTerm);
    }
  };

  const handleNextPage = () => {
    if (nextPageToken) {
      setCurrentPage(currentPage + 1);
      fetchVideos(searchTerm, nextPageToken);
    }
  };

  const handlePrevPage = () => {
    if (prevPageToken) {
      setCurrentPage(currentPage - 1);
      fetchVideos(searchTerm, prevPageToken);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    }
    return views;
  };

  const openVideoInNewTab = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, "_blank");
  };

  if (loading)
    return (
      <div className="text-lg items-center flex justify-center">Loading...</div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <Helmet>
        <title>Career Advice & Job Tips Videos | JobNirvana</title>
        <meta name="description" content="Watch the latest career advice, interview tips, and job search strategies videos to boost your professional success." />
        <meta property="og:title" content="Career Advice Videos | JobNirvana" />
        <meta name="keywords" content="career videos, interview tips, job search advice, resume tips" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mb-6 space-x-2"
      >
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {videos.map((video) => (
          <div
            key={video.id.videoId || video.id}
            className="video-card cursor-pointer"
            onClick={() => openVideoInNewTab(video.id.videoId || video.id)}
          >
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId || video.id
                }`}
              title={video.snippet.title}
              className="rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4 className="mb-2 text-lg font-semibold text-gray-800">
              {video.snippet.title}
            </h4>
            <p className="text-base font-semibold text-gray-500">
              {video.snippet.channelTitle}
            </p>

            {/* Views and Uploaded Date */}
            <div className="mt-2 text-sm text-gray-600 flex gap-1">
              {/* Views */}
              <p>{formatViews(video.statistics?.viewCount)} views</p>

              {/* Uploaded Date */}
              <p>
                {formatDistanceToNow(new Date(video.snippet.publishedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={!prevPageToken}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!nextPageToken}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default YouTubeHome;
