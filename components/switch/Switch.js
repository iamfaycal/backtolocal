import React, { useContext } from "react";
import { Context } from "../context/context";
import PropTypes from "prop-types";

const Switch = () => {
    const { dispatch } = useContext(Context);

    return (
        <>
            <style jsx>{`
                .vueSelector {
                    display: none;
                    justify-content: center;
                    align-items: center;
                    padding: 10px 0;
                }
                @media screen and (max-width: 1300px) {
                    .vueSelector {
                        display: flex;
                    }
                }
                .vueSelector__label {
                    font-size: 16px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .vueSelector__switch {
                    position: relative;
                    display: inline-block;
                    width: 60px;
                    height: 34px;
                    margin: 0 10px;
                }

                .vueSelector__switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .vueSelector__slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    -webkit-transition: 0.4s;
                    transition: 0.4s;
                    border-radius: 34px;
                }

                .vueSelector__slider:before {
                    position: absolute;
                    content: "";
                    height: 26px;
                    width: 26px;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: 0.4s;
                    transition: 0.4s;
                    border-radius: 34px;
                }

                input:checked + .vueSelector__slider {
                    background-color: #0b331f;
                }

                input:focus + .vueSelector__slider {
                    box-shadow: 0 0 1px #0b331f;
                }

                input:checked + .vueSelector__slider:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                    border-radius: 50%;
                }
            `}</style>
            <div className="vueSelector">
                <h5 className="vueSelector__label">Liste</h5>
                <label className="vueSelector__switch">
                    <input
                        type="checkbox"
                        onChange={() => dispatch({ type: "toggleVue" })}
                    />
                    <span className="vueSelector__slider round"></span>
                </label>
                <h5 className="vueSelector__label">Carte</h5>
            </div>
        </>
    );
};

Switch.propTypes = () => {
    onChange: PropTypes.func.isRequired;
};

export default Switch;
