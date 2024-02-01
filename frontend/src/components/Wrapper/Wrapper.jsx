import './wrapper.css'

import PropTypes from "prop-types";

function Wrapper({  children }) {
    return (
        <div className="wrapper">
            <div className="wrapper-inner">
                {children}
            </div>
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.object
}

export default Wrapper