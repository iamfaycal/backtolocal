import React, { useContext } from "react";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

import { LIST } from "../context/types";
import { Context } from "../context/context";

const List = ({ data }) => {
    const {
        state: { vue },
    } = useContext(Context);

    return (
        <div id="list" className={vue != LIST ? "hiddenOnMobile" : undefined}>
            <style jsx>{`
                #list {
                    width: 50%;
                    padding: 0 20px;
                    overflow: auto;
                }
                @media screen and (max-width: 1300px) {
                    #list {
                        width: 100%;
                    }
                }
            `}</style>
            {data.map((item) => (
                <ListItem key={item.id} item={item} />
            ))}
        </div>
    );
};

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;
