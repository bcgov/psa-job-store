import { Button } from 'antd';
import React from 'react';
import NoResultsGraphic from '../../../assets/search_empty.svg';

interface NoResultsViewProps {
  onClearFilters?: () => void;
}

const NoResultsView: React.FC<NoResultsViewProps> = ({ onClearFilters }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        flexGrow: 1, // Expand to take available space
        background: 'white',
        marginBottom: '1rem',
      }}
    >
      <img src={NoResultsGraphic} alt="No results found" />
      <h3>No results found!</h3>
      <p>Try adjusting your search or filters</p>
      {onClearFilters && (
        <Button onClick={onClearFilters} type="link">
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default NoResultsView;
