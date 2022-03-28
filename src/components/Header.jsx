import PropTypes from 'prop-types'


function Header({ text, bgcolor, textColor }) {

    const headerStyles = {
        backgroundColor: bgcolor,
        color: textColor
    }

    return (
        <header style={headerStyles}>
            <div className="container">
                <h2>{text}</h2>
            </div>
        </header>
    )
}

Header.defaultProps = {
    text: "Feedback UI",
    bgcolor: 'rgba(0,0,0,0.4)',
    textColor: '#ff6a95',
}

Header.propTypes = {
    text: PropTypes.string,
}

export default Header
