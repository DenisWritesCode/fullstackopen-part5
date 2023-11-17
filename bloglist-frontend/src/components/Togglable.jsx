import { useState } from 'react';

const Togglable = (props) => {
    // by default, visible is off
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    /**
     * Function to toggle the value of visibility
     */
    const toggleVisiblity = () => {
        setVisible(!visible);
    };

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisiblity}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisiblity}>cancel</button>
            </div>
        </div>
    );
};

export default Togglable;
