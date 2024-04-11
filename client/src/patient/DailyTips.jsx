
import { useQuery, gql } from '@apollo/client';

const ALL_MOTIVATION_TIPS_QUERY = gql`
  query AllMotivationTips {
    allMotivationTips {
      id
      content
    }
  }
`;

const DailyTips = () => {
  const { loading, error, data, refetch } = useQuery(ALL_MOTIVATION_TIPS_QUERY);

  const fetchNewTip = () => {
    refetch(); // Refresh the motivational tip data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Get the last tip
  const lastTipIndex = data.allMotivationTips.length - 1;
  const lastTip = data.allMotivationTips[lastTipIndex];

  return (
    <div>
      <h2>Latest Motivational Tip</h2>
      <p>{lastTip.content}</p>
      <button onClick={fetchNewTip}>Refresh</button>
    </div>
  );
};

export default DailyTips;
