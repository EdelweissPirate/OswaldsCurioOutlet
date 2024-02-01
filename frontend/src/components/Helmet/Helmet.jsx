import PropTypes from "prop-types";

function Helmet(props) {
    document.title = 'OCO - ' + props.title

    return (
        <div className="w-fill">
            {props.children}
        </div>
    )
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.func,
}

export default Helmet