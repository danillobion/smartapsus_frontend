import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import Areas from './Itens/Areas';
import Pontos from './Itens/Pontos';


const Mapa: React.FC = ({ mapRef=null,chamarFuncao=null,showModal=null,dadosAreas=null,dadosPontos=null }) => {
    const [selecionado, setSelecionado] = useState("nenhum");

    const areaSelecionada = (valor) => {
        setSelecionado(valor);
    };

    useEffect(() => {
        const updateMapHeight = () => {
            let mapElement = document.getElementById('map');
            let height = window.innerHeight - 50; // -50 representa a altura do menu superior
            if (mapElement) {
                mapElement.style.height = height + 'px';
            }
        };


        updateMapHeight();
        window.addEventListener('resize', updateMapHeight);
        
        return () => {
            window.removeEventListener('resize', updateMapHeight);
        };
    }, []);
    

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}>

            {/* menu lateral - mapa */}
            <div className='flex flex-col absolute' style={{marginTop:'72px'}}>
                <button onClick={() => chamarFuncao('abrirFecharModal')}  
                        className='flex items-center justify-center bg-white m-3 mb-0 shadow-md rounded border border-gray-50 hover:bg-gray-100' 
                        style={{zIndex:'9', width:'32px', height:'32px'}}
                        title='Áreas'>
                    <svg fill="#909090" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M2.5,8.86l9,5.2a1,1,0,0,0,1,0l9-5.2A1,1,0,0,0,22,8a1,1,0,0,0-.5-.87l-9-5.19a1,1,0,0,0-1,0l-9,5.19A1,1,0,0,0,2,8,1,1,0,0,0,2.5,8.86ZM12,4l7,4-7,4L5,8Zm8.5,7.17L12,16,3.5,11.13a1,1,0,0,0-1.37.37,1,1,0,0,0,.37,1.36l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,.37-1.36A1,1,0,0,0,20.5,11.13Zm0,4L12,20,3.5,15.13a1,1,0,0,0-1.37.37,1,1,0,0,0,.37,1.36l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,.37-1.36A1,1,0,0,0,20.5,15.13Z"/>
                    </svg>
                </button>
            </div>
            <div className={ showModal ? `top-0 right-0 fixed bg-white m-3 mr-0 shadow-md py-1.5 rounded-l-lg border border-gray-50 p-3 pt-3` : `hidden`}
                style={{ zIndex: '9', marginTop: '60px', width: '300px', height: '100%' }}>
                <div className='flex justify-between'>
                    <h6 className='text-2xl' style={{ color: '#1A4568' }}>Mapa</h6>
                    <button onClick={() => chamarFuncao('abrirFecharModal')}
                            className='bg-gray-50 hover:bg-gray-100 px-2 py-2 rounded-lg' 
                            type='button'
                            style={{ fontSize: '12px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#909090" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>

                    </button>
                </div>
                <div className='flex flex-col mt-2'>
                    <h6 className='text-gray-400'
                        style={{ fontSize: '14px' }}>
                            O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.
                    </h6>
                    <h6 className='mt-2 text-1xl' style={{ color: '#1A4568' }}>Áreas</h6>
                    <h6 className='text-gray-400'
                        style={{ fontSize: '14px' }}>
                            O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.
                    </h6>
                    <div className="flex items-center mt-2 mb-1">
                        <input type="radio" 
                                name="default-radio" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
                                checked={selecionado === "nenhum"} 
                                onChange={() => {
                                    chamarFuncao('limparAreas');
                                    areaSelecionada("nenhum");
                                }} 
                                />
                        <label htmlFor="default-radio-1" className="ms-2 text-sm" aria-label="Nenhuma">Nenhuma</label>
                    </div>
                    <div className="flex items-center mb-1">
                        <input type="radio"
                                name="default-radio" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                checked={selecionado === "regioes"} 
                                onChange={() => {
                                    chamarFuncao('regioes');
                                    areaSelecionada("regioes");
                                }} />
                        <label htmlFor="default-radio-2" className="ms-2 text-sm" aria-label="Regiões">Regiões</label>
                    </div>
                    <div className="flex items-center mb-1">
                        <input type="radio"
                                name="default-radio" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" 
                                checked={selecionado === "estados"} 
                                onChange={() => {
                                    chamarFuncao('estados');
                                    areaSelecionada("estados");
                                }}/>
                        <label htmlFor="default-radio-3" className="ms-2 text-sm" aria-label="Estados">Estados</label>
                    </div>
                    <h6 className='mt-2 text-1xl' style={{ color: '#1A4568' }}>Unidades</h6>
                    <h6 className='text-gray-400'
                        style={{ fontSize: '14px' }}>
                            O Lorem Ipsum é um texto modelo da indústria tipográfica e de impressão.
                    </h6>
                    <div className="flex items-center mt-2 mb-1">
                        <input type="checkbox" 
                                name="unidade-checkbox-1" 
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" 
                                onChange={(e) => chamarFuncao('unidades',e.target.checked)}/>
                        <label htmlFor="unidade-checkbox-1" className="ms-2 text-sm" aria-label="Centros de Atenção Primária à Saúde">Unidades de Saúde</label>
                    </div>
                </div>
            </div>
            {/* menu lateral - mapa */}

            <MapContainer ref={mapRef} style={{ height: '100%', width: '100%', zIndex:'0' }} center={[-17.01,-60.73]} zoom={4}>

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                <Areas dados={dadosAreas}/>
                <Pontos dados={dadosPontos}/>
            </MapContainer>
        </div>
    );
};

export default Mapa;
