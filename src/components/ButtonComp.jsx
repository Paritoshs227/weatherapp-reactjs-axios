

const ButtonComp = (props) => {
  return (
    <button type={props.buttonType} onClick={props.onBtnClick} className={props.btnCss}>{props.btnText}</button>
  )
}

export default ButtonComp