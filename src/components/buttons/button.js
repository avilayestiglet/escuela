const ButtonTheme = ({
    child,
    myclass = "btn_on-hover btn theme-bg-primary text-white w-100 mb-2",
    onClick
}) => (
    <button type="button" className={myclass} onClick={onClick}>
      {child}
    </button>
  );

  export default ButtonTheme;