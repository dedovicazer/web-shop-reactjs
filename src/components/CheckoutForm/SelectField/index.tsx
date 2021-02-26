import {Grid, InputLabel, MenuItem, Select} from '@material-ui/core';
import * as React from 'react';
import {FC, useEffect, useState} from "react";
import {useDispatch} from "react-redux";


type Props = {
    values: any
    value: string
    title: string
    setValue: (value: string) => void
};

const SelectField: FC<Props> = ({ values , title, value, setValue}): JSX.Element => {
    const dispatch = useDispatch()

    const onSelelctValue = (e: React.ChangeEvent<any>) => {
        dispatch(setValue(e.target.value))
    }

    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{title}</InputLabel>
            <Select value={value} fullWidth onChange={onSelelctValue} >
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
