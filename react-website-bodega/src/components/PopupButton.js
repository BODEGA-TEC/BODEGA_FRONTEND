import Controls from "./controls/Controls";

const PopupButton = ({ text, icon, setOpenPopup }) => {
  return (
    <Controls.Button
      text={text}
      variant="outlined"
      startIcon={icon}
      onClick={() => {
        setOpenPopup(true);
      }}
    />
  );
};

export default PopupButton;
