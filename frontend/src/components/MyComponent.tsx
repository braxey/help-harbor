import React, { useState, useEffect } from 'react';

interface Data {
  data: string;
}

const MyComponent: React.FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    console.log(process.env);
    let url = backendUrl + '/api/example';
    console.log(url);
    fetch(url)
      .then(response => response.json() as Promise<Data>)
      .then((jsonData: Data) => {
        setData(jsonData); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      <h1>My Component</h1>
      {data && (
        <div>
          <p>Data from the backend:</p>
          <p>{data.data}</p> {/* Access the data property */}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
