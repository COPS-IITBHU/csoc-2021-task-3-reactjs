export default function Spinner () {
    const spinnerStyle = {
        background : 'transparent',
        height : '20px',
        width : '20px',
        borderRadius : '50%',
        borderRight : '5px solid white',
        borderTop : '5px solid rgba(255,255,255,0.4)',
        borderBottom : '5px solid rgba(255,255,255,0.4)',
        borderLeft : '5px solid rgba(255,255,255,0.4)',
        marginRight : '5px',
    }

    return (
        <div className="animate-spin" style={spinnerStyle} ></div>
    )
}