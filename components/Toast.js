import Spinner from './Spinner';

export default function Toast (props) {
    let classes = "rounded";
    if (props.neutral)
        classes += " bg-blue-600 text-white";
    else if (props.danger)
        classes += " bg-red-300 text-black";
    else if (props.success)
        classes += " bg-green-500 text-white";

    const stylesContainer = {
        position : 'fixed',
        top : '100vh',
        right : '10px',
        transform : 'translateY(-110%)',
        alignItems : 'center',
        justifyContent : 'center',
        padding : '15px'
    }

    if (props.show)
        stylesContainer.display = 'flex';
    else 
        stylesContainer.display = 'none';

    return (
        <div className={classes} style={stylesContainer}>
            {props.spinner ? <Spinner /> : null} 
            <div>{props.text}</div>
        </div>
    )
}