
import { useQuery, gql } from '@apollo/client';
import './styles/list.css';

const ALL_VISITS_QUERY = gql`
  query AllVisits {
    allVisits {
      id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      visitDate
      patient {
        email
      }
    }
  }
`;

const AllVisits = () => {
  const { loading, error, data, refetch } = useQuery(ALL_VISITS_QUERY);

  const handleRefresh = () => {
    refetch(); // Refetch data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Sort visits by most recent visitDate
  const sortedVisits = [...data.allVisits].sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));

  const formatTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  return (
    <div className="visit-list-container">
      <h1>All Visits</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <ul className="visit-list">
        {sortedVisits.map(visit => (
          <li key={visit.id} className="visit-item">
            <div className="visit-details">
              <div><strong>Visit Date: </strong> {formatTimestampToDate(visit.visitDate)}</div>
              <div><strong>Body Temperature:</strong> {visit.bodyTemperature}</div>
              <div><strong>Heart Rate:</strong> {visit.heartRate}</div>
              <div><strong>Blood Pressure:</strong> {visit.bloodPressure}</div>
              <div><strong>Respiratory Rate:</strong> {visit.respiratoryRate}</div>
              <div><strong>Patient Email:</strong> {visit.patient.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllVisits;
