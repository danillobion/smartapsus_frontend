import React, { useEffect, useRef, useState } from 'react';
import { GeoJSON, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';

// Definição de cores para cada região
const regionColors = {
  Norte: '#A6D96A',
  Nordeste: '#1C9099',
  Sul: '#FC4E2A',
  Sudeste: '#FEB24C',
  'Centro-Oeste': '#FFFF33'
};

const Areas = ({ dados }) => {
  const map = useMap();
  const layerGroupRef = useRef(L.layerGroup());
  const [popupContent, setPopupContent] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);

  useEffect(() => {
    layerGroupRef.current.clearLayers();

    if (dados && dados.length > 0) {
      dados.forEach(area => {
        const geoJsonData = area.shape;
        const areaColor = regionColors[area.nome] || (area.regiao && regionColors[area.regiao.nome]) || '#A6D96A';

        const layer = L.geoJSON(geoJsonData, {
          style: {
            color: '#ffffff',
            weight: 1,
            fillColor: areaColor,
            fillOpacity: 0.5
          }
        });

        layer.on('click', (event) => {
          map.fitBounds(layer.getBounds(), { padding: [50, 50] });
          setTimeout(() => {  // Adicionar um pequeno atraso antes de mostrar o popup
            setPopupContent({
              nome: area.nome,
              numeroUnidades: area.numeroUnidades,
              numeroProfissionais: area.numeroProfissionais
            });
            setPopupPosition(event.latlng);
          }, 300);  // 300 milissegundos de atraso
        });

        layerGroupRef.current.addLayer(layer);
      });

      if (!map.hasLayer(layerGroupRef.current)) {
        map.addLayer(layerGroupRef.current);
      }
    }

    return () => {
      if (map.hasLayer(layerGroupRef.current)) {
        map.removeLayer(layerGroupRef.current);
      }
    };
  }, [map, dados]);

  return (
    <>
      {popupContent && popupPosition && (
                <Popup position={popupPosition} className='p-0 m-0'>
                    <div className='flex flex-col p-0 m-0' style={{width:'210px'}}>
                        <h6 className='p-3' style={{fontSize:'20px'}}>{popupContent.nome}</h6>
                        <div className='m-3 mt-0 '>
                            <div className='flex justify-between'>
                                <h6 className='m-0 text-gray-500'>Nº de unidades</h6>
                                <h6 className='m-0'>0</h6>
                            </div>
                            <div className='flex justify-between'>
                                <h6 className='m-0 text-gray-500'>Nº de profissionais</h6>
                                <h6 className='m-0'>0</h6>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}

    </>
  );
};

export default Areas;
