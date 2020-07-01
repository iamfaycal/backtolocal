import React, { useContext } from "react";
import PropTypes from "prop-types";

import { Context } from "../context/context";

const ListItem = ({ item }) => {
    const { dispatch } = useContext(Context);

    console.log(item);

    return (
        <div className="listItem">
            <style jsx>{`
                .listItem {
                    display: flex;
                    margin-bottom: 15px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    overflow: hidden;
                    height: 250px;
                }
                .listItem__image {
                    width: 350px;
                    height: 100%;
                    margin-right: 15px;
                    font-size: 0;
                }
                .listItem__image img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }
                .listItem__content {
                    display: flex;
                    flex-direction: column;
                }
                .listItem__type {
                    margin-top: 20px;
                    font-size: 15px;
                    color: #aaa;
                }
                .listItem__name {
                    font-size: 23px;
                    line-height: 22px;
                    font-weight: bold;
                    margin-top: 5px;
                    margin-bottom: 25px;
                }
                .listItem__address,
                .listItem__productOrigins {
                    font-size: 15px;
                }
                .listItem__button {
                    margin: auto 0 20px;
                    font-size: 20px;
                }
            `}</style>
            <div className="listItem__image">
                <img src={item.data.image.url} alt={item.data.image.alt} />
            </div>
            <div className="listItem__content">
                <span className="listItem__type">
                    {item.data.product_type[0].text}
                </span>
                <h4 className="listItem__name">{item.data.name[0].text}</h4>
                <span className="listItem__address">
                    {item.data.address[0].text}
                </span>
                <span className="listItem__productOrigins">
                    <strong>Provenance des produits : </strong>
                    {item.data.product_origin[0].text}
                </span>
                <a
                    href="#"
                    className="listItem__button"
                    onClick={() => {
                        dispatch({ type: "toggleVue" });
                        dispatch({
                            type: "editCoordinates",
                            payload: [
                                item.data.coordinates.longitude,
                                item.data.coordinates.latitude,
                            ],
                        });
                    }}
                >
                    Voir sur la carte &rarr;
                </a>
            </div>
        </div>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ListItem;
