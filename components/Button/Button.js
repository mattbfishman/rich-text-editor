var PropTypes = require('prop-types');

const Button = (props) => {
    let {label, Icon, className, ariaText, onClick} = props;
    
    return (
        <button className={className} aria-label={ariaText} onClick={onClick}>
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