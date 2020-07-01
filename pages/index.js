import { useContext } from "react";
import { Provider } from "../components/context/context";

import dynamic from "next/dynamic";
import PropTypes from "prop-types";

import Header from "../components/header/Header";
import List from "../components/list/List";
import Switch from "../components/switch/Switch";

const DynamicMap = dynamic(() => import("../components/map/Map"), {
    ssr: false,
});

import Prismic from "prismic-javascript";

function HomePage({ data }) {
    return (
        <div className="wrapper">
            <Provider>
                <style jsx>{`
                    .mapListSection {
                        display: flex;
                        height: calc(100vh - 80px);
                        overflow: hidden;
                        margin-top: 80px;
                    }
                    @media screen and (max-width: 1300px) {
                        .mapListSection {
                            flex-direction: column;
                        }
                    }
                `}</style>
                <Header />
                <section className="mapListSection">
                    <Switch />
                    <List data={data} />
                    <DynamicMap data={data} className="hiddenOnMobile" />
                </section>
            </Provider>
        </div>
    );
}

HomePage.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export async function getServerSideProps(context) {
    const apiEndpoint = process.env.PRISMIC_URL;
    const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

    const Client = Prismic.client(apiEndpoint, { accessToken });

    const res = await Client.query(
        Prismic.Predicates.at("document.type", "shops")
    );
    if (res) {
        return {
            props: {
                data: res.results,
            },
        };
    }
}

export default HomePage;
