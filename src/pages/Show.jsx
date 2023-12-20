import { useEffect, useState } from 'react'; // Import useState from React
import { useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';

const Show = () => {
  const { showId } = useParams();

  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getShowById(showId);
        setShowData(data); // Set the showData state with the fetched data
      } catch (err) {
        setShowError(err);
      }
    }

    fetchData();
  }, [showId]);

  if (showError) {
    return <div>We have an error: {showError.message}</div>;
  }

  if (showData) {
    return <div>Got show data: {showData.name}</div>;
  }

  return <div>Data is loading</div>;
};

export default Show;
