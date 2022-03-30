var PropTypes = require('prop-types');

const Button = (props) => {
    let {label, Icon, className, ariaText} = props;
    
    return (
        <button className={className} aria-label={ariaText}>
            {label}
            {Icon && <Icon/>}
        </button>
    )
}

Button.propTypes = {
    label: PropTypes.string
}

Button.defaultProps = {
    label: ''
}

export default Button;