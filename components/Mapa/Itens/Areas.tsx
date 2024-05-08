import React, { useState } from 'react';
import { Polygon, Popup } from 'react-leaflet';
import "@/app/globals.css";

const Areas = ({ dados }) => {
    const [popupContent, setPopupContent] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null);

    const handleAreaClick = (event, dados) => {
        setPopupContent(dados);
        setPopupPosition(event.latlng);
    };
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div>
            {dados != undefined && dados != null && dados.map((area, index) => {
                const cor = randomColor();
                return (
                    (area.shape ? (
                        <Polygon
                            key={index}
                            positions={area.shape ? JSON.parse(area.shape) : null}
                            color={cor}
                            fillColor={cor}
                            fillOpacity={0.5}
                            eventHandlers={{
                                click: (event) => handleAreaClick(event, area)
                            }}
                        />
                    ): null)
                );
            })}
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
        </div>
    );
};

export default Areas;
