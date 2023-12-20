

const InputBox = (props) => {
    return (
        <div className={props.inputContainerCss} >
            <label className={props.labelCss}>{props.label}</label>
            <input  type={props.inputType} value={props.inputVal} onChange={(e) => props.onInputChange(e.target.value)} className={props.inputCss} />
        </div>
    )
}

export default InputBox