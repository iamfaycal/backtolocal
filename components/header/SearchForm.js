import React from "react";

const SearchForm = () => {
    return (
        <form id="searchForm">
            <style jsx>{`
                .searchForm__input {
                    border: 1px solid #ddd;
                    padding: 10px 20px;
                    border-radius: 20px;
                    width: 600px;
                    margin-right: 20px;
                    font-size: 15px;
                }
                .searchForm__submit {
                    border: 3px solid #0b331f;
                    padding: 10px 20px;
                    border-radius: 30px;
                    background: #0b331f;
                    color: white;
                    cursor: pointer;
                    transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
                    font-size: 15px;
                }
                .searchForm__submit:hover {
                    color: #0b331f;
                    background: white;
                }  
                @media screen and (max-width: 1300px) {
                    .searchForm__input {
                        width: 350px;
                        margin-right: 10px;
                    }
                }
            `}</style>
            <input
                className="searchForm__input"
                type="search"
                placeholder="Entrez votre adresse, ville ou code postal"
            />
            <button type="submit" className="searchForm__submit">
                Rechercher
            </button>
        </form>
    );
};

export default SearchForm;
