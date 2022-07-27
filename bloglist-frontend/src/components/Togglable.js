import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    props: PropTypes.array,
    refs: PropTypes.func
}

export default Togglable
