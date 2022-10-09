import React from "react";
import { TextBoxComponent, NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
 CheckBoxComponent,
 RadioButtonComponent,
} from "@syncfusion/ej2-react-buttons";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";


const Input = ({ value, onChange, type, ...rest }) => {
  switch (type) {
    case "text":
      return (
        <TextBoxComponent
          htmlAttributes={rest?.htmlAttributes}
          showClearButton={true}
          floatLabelType="Auto"
          placeholder={rest?.placeholder}
          change={({ value }) => onChange(value)}
          value={value}
        />
      );
    case "number":
      return (
        <NumericTextBoxComponent
          htmlAttributes={rest?.htmlAttributes}
          showSpinButton={false}
          showClearButton={true}
          floatLabelType="Auto"
          format='####'
          placeholder={rest?.placeholder}
          change={({ value }) => onChange(value)}
          value={value}
        />
      );
   case "radio":
     return rest?.options.map((e) => (
       <RadioButtonComponent
         key={e}
         label={e}
         value={e}
         onChange={(value) => onChange(value)}
         checked={value === e}
       />
     ));
   case "dropdown":
      return (
       <DropDownListComponent
          sortOrder="Ascending"
          placeholder={rest?.placeholder}
          dataSource={rest?.options}
          select={({ itemData }) => {
            onChange(itemData.value);
          }}
          value={value}
       />
     );

   case "checkbox":
     return (
       <CheckBoxComponent
         label={rest?.checkboxLabel}
         onChange={(e) => onChange(e.target.checked)}
         checked={value}
       />
     );

   default:
     return null;
 }
};

export default Input;