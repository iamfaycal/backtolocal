const Header = () => {
    return (
        <header id="header">
            <style jsx>{`
                #header {
                    position: fixed;
                    top: 0;
                    padding: 0 20px;
                    height: 80px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: white;
                    z-index: 999;
                }
                #header h1 {
                    font-size: 25px;
                }
            `}</style>
            <h1>Back to local</h1>
        </header>
    );
};

export default Header;
