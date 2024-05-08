import React, { useState } from 'react';
import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import "@/app/globals.css";

const Pontos = ({ dados }) => {
    const [popupContent, setPopupContent] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null);
    
    const customIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [13, 0],
    });

    const handleAreaClick = (event, nome) => {
        setPopupContent(nome);
        setPopupPosition(event.latlng);
    };

    return (
        <div>
            {dados && dados.map((ponto, index) => {
                return (
                    <Marker key={index} position={ponto.endereco.localizacao} icon={customIcon} onClick={(e) => handleAreaClick(e, ponto.nome)}>
                        <Popup>
                            <div className='flex flex-col p-0 m-0' style={{width:'250px'}}>
                            <h6 className='p-3' style={{fontSize:'20px'}}>{ponto.nome}</h6>
                            <div className='m-3 mt-0 '>
                                <div className='flex justify-between'>
                                    <h6 className='m-0 text-gray-500'>CNES</h6>
                                    <h6 className='m-0'>{ponto.cnes}</h6>
                                </div>
                                <div className='flex justify-between'>
                                    <h6 className='m-0 text-gray-500'>Tipo de unidade</h6>
                                    <h6 className='m-0'>{ponto.tipoUnidade}</h6>
                                </div>
                                <div className='flex justify-between'>
                                    <h6 className='m-0 text-gray-500'>Turno de atendimento</h6>
                                    <h6 className='m-0'>{ponto.turnoAtendimento}</h6>
                                </div>
                                <div className='flex justify-between'>
                                    <h6 className='m-0 text-gray-500'>Nº de profissionais</h6>
                                    <h6 className='m-0'>0</h6>
                                </div>
                            </div>
                        </div>
                        </Popup>
                    </Marker>
                )}
            )}
        </div>
    );
};

export default Pontos;
