import {Grid, InputLabel, MenuItem, TextField, Select} from '@material-ui/core';
import * as React from 'react';
import {FC, useState} from "react";
import {Controller, useForm, useFormContext} from 'react-hook-form';

type Props = {
    values: any
    value: string
    title: string
};

const SelectField: FC<Props> = ({ values , title, value}): JSX.Element => {
    const [selectValue, setSelectValue] = useState(value)



    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} fullWidth onChange={(e: React.ChangeEvent<any>): void => setSelectValue(e.target.value)} >
                {
                    values.map((item: { id: string, label: string }) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.label}
                        </MenuItem>
                    ))
                }
            </Select>

        </Grid>
    )
}

export default SelectField
