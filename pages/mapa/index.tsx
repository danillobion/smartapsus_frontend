import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../../components/Mapa/Mapa'), {
  ssr: false 
});

const IndexPage: React.FC = () => {
  const [markers, setMarkers] = useState([
    { lat: -8.88202, lng: -36.50216, legenda: "Garanhuns"},
    { lat: -8.0700996, lng: -34.8824260, legenda: "São José" }
  ]);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <DynamicMap markers={markers} />
    </div>
  );
}

export default IndexPage;
