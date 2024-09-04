
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const MainMuiPickers = (props) =>{
    return(
        <div className="form-group">
            <label className="font_weight">{props.children}</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                className="form-control"
                openTo="year"
                label="Pick Date"
                views={['year', 'month', 'day']}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
            </LocalizationProvider>
        </div>
    )
}
export {MainMuiPickers}