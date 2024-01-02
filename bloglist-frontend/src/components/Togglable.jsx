import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(function Togglable(props, refs) {
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

    useImperativeHandle(refs, () => {
        return {
            toggleVisiblity,
        };
    });

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
});

Togglable.displayName = 'Togglable';

export default Togglable;
