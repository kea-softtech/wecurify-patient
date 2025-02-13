import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import { Theme_Color } from '../config';

const MainTabs = (props) => {
    return (
        <Paper square className='mb-2'>
            <Tabs
                variant="scrollable"
                value={props.value}
                onChange={props.onChange}
                indicatorColor="primary"
                textColor="primary"
                TabIndicatorProps={{ style: { background: Theme_Color, fontSize:20} }}
            >
                <Tab label={props.label} />
                <Tab label={props.label1} />
                <Tab label={props.label2} />
                <Tab label={props.label3} />
                <Tab label={props.label4} />
            </Tabs>
        </Paper>
    )
}
export { MainTabs }