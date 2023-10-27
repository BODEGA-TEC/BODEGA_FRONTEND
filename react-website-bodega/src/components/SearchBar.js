import Controls from "./controls/Controls";
import { Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material/";

// Componentes de entrada
const SearchBar = ({ label, handleSearch, ...other}) => {
  return (
    <Controls.Input
      label={label}
      style={{ width: "100%" }}
      {...other}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
