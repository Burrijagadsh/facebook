
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PagesSelect = ({ accessToken }) => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageStats, setPageStats] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      const result = await axios.get(
        `https://graph.facebook.com/me/accounts?access_token=${accessToken}`
      );
      setPages(result.data.data);
    };

    fetchPages();
  }, [accessToken]);

  const handlePageSelect = async (e) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);
    const since = '2024-01-01'; // Example date
    const until = '2024-06-30'; // Example date

    const result = await axios.get(
      `https://graph.facebook.com/${pageId}/insights?metric=page_fans,page_engaged_users,page_impressions,page_actions_post_reactions_like_total&period=total_over_range&since=${since}&until=${until}&access_token=${accessToken}`
    );

    setPageStats(result.data.data);
  };

  return (
    <div>
      <select onChange={handlePageSelect}>
        <option value="">Select a Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>
            {page.name}
          </option>
        ))}
      </select>

      {pageStats && (
        <div className="row">
          {pageStats.map((stat, index) => (
            <div className="col-md-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{stat.title}</h5>
                  <p className="card-text">{stat.values[0].value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesSelect;
