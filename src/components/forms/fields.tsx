import RHFAutocomplete from "./rhf-autocomplete"
import RHFCheckbox, { RHFMultiCheckbox } from "./rhf-checkbox"
import RHFCode from "./rhf-code"
import RHFInput from "./rhf-input"
import RHFRadioGroup from "./rhf-radio-group"
import RHFRating from "./rhf-rating"
import RHFSelect, { RHFMultiSelect } from "./rhf-select"
import RHFSlider from "./rhf-slider"
import RHFSwitch, { RHFMultiSwitch } from "./rhf-switch"
import RHFTextArea from "./rhf-textarea"

const Field = {
    Autocomplete: RHFAutocomplete,
    Checkbox: RHFCheckbox,
    Code: RHFCode,
    Input: RHFInput,
    MultiCheckbox: RHFMultiCheckbox,
    MultiSelect: RHFMultiSelect,
    MultiSwitch: RHFMultiSwitch,
    RadioGroup: RHFRadioGroup,
    Rating: RHFRating,
    Select: RHFSelect,
    Slider: RHFSlider,
    Switch: RHFSwitch,
    TextArea: RHFTextArea,
    // CountrySelect: RHFCountrySelect,
    // MobileDateTimePicker: RHFMobileDateTimePicker,
    // DatePicker: RHFDatePicker,
    // Editor: RHFEditor,
    // Upload: RHFUpload,
    // UploadBox: RHFUploadBox,
    // UploadAvatar: RHFUploadAvatar,
}

export default Field
