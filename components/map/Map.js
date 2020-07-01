import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { MAP } from "../context/types";

import { Context } from "../context/context";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const Map = ({ data }) => {
    const {
        state: { mapCenterCoordinates, vue },
    } = useContext(Context);
    const [map, setMap] = useState(null);

    useEffect(() => {
        // TO DO : PUT API KEY INTO ENV
        mapboxgl.accessToken =
            "pk.eyJ1IjoiaWFtZmF5eSIsImEiOiJjazljemdpdGMwODFvM21xcDN1am5tOHlyIn0.qPVP15JfQe55NqETdLAwaw";

        const initMap = () => {
            let map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: mapCenterCoordinates,
                zoom: 16,
                trackResize: true,
            });

            map.resize();

            map.on("load", () => {
                setMap(map);
                map.loadImage("/assets/image/marker.png", (error, marker) => {
                    map.addImage("marker", marker);
                    map.addSource("shops", {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: data.map((item) => ({
                                type: "Feature",
                                properties: {
                                    description: `
                                            <div className="itemPopup">
                                                <div className="itemPopup__image">
                                                    <img style="max-width: 100%;" src=${item.data.image.url} alt={item.data.image.alt} />
                                                </div>
                                                <div className="itemPopup__content" style="display: flex; flex-direction: column;">
                                                    <span className="itemPopup__type">${item.data.product_type[0].text}</span>
                                                    <h4 className="itemPopup__name">${item.data.name[0].text}</h4>
                                                    <span className="itemPopup__address">${item.data.address[0].text}</span>
                                                    <span className="itemPopup__productOrigins"><strong>Provenance des produits : </strong>${item.data.product_origin[0].text}</span>
                                                </div>
                                            </div>`,
                                },
                                geometry: {
                                    type: "Point",
                                    coordinates: [
                                        item.data.coordinates.longitude,
                                        item.data.coordinates.latitude,
                                    ],
                                },
                            })),
                        },
                    });

                    map.addLayer({
                        id: "markers",
                        type: "symbol",
                        source: "shops",
                        layout: {
                            "icon-image": "marker",
                            "icon-size": 0.3,
                        },
                    });

                    let popup = new mapboxgl.Popup({
                        closeButton: false,
                        closeOnClick: true,
                    });

                    map.on("click", "markers", function (e) {
                        popup.remove();

                        let coordinates = e.features[0].geometry.coordinates.slice();
                        let description = e.features[0].properties.description;

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] +=
                                e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }

                        popup
                            .setLngLat(coordinates)
                            .setHTML(description)
                            .addTo(map);
                    });

                    map.on("mouseenter", "markers", function () {
                        map.getCanvas().style.cursor = "pointer";
                    });

                    map.on("mouseleave", "markers", function () {
                        map.getCanvas().style.cursor = "";
                    });
                });
            });
        };
        if (!map) initMap();
    }, [map]);

    useEffect(() => {
        if (map) map.resize();
    }, [vue]);

    useEffect(() => {
        if (map) map.flyTo({ center: mapCenterCoordinates });
    }, [mapCenterCoordinates]);

    return (
        <div id="map" className={vue != MAP ? "hiddenOnMobile" : undefined}>
            <style jsx>{`
                #map {
                    position: relative;
                    min-height: 100%;
                    width: 50%;
                }
                @media screen and (max-width: 1300px) {
                    #map {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

Map.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
