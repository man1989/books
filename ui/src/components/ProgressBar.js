import { forwardRef } from "react"

const ProgressBar = forwardRef(function ProgressBar(props, ref){
    return (
        <progress  {...props}  ref={ref}></progress>
    )
});

export default ProgressBar;