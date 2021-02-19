import {Grid, InputLabel, MenuItem, TextField, Select} from '@material-ui/core';
import * as React from 'react';
import {FC, useState} from "react";
import {Controller, useForm, useFormContext} from 'react-hook-form';

type Props = {
    name: string
    label: string
    required?: boolean
    title: string
};

const SelectField: FC<Props> = ({ required, title}): JSX.Element => {
    const [values, setValues] = useState([])
    const [value, setValue] = useState("")

    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{title}</InputLabel>
            {/*<Select value={} fullWidth onChange={} >*/}
            {/*    <MenuItem key={} value={}>*/}
            {/*        Select me*/}
            {/*    </MenuItem>*/}
            {/*</Select>*/}

        </Grid>
    )
}

export default SelectField
