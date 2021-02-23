import {Grid, InputLabel, MenuItem, TextField, Select} from '@material-ui/core';
import * as React from 'react';
import {FC, useState} from "react";
import {Controller, useForm, useFormContext} from 'react-hook-form';

type Props = {
   countries: any
    title: string
};

const SelectField: FC<Props> = ({ countries , title}): JSX.Element => {
    const keys = Object.keys(countries)


    return (
        <Grid item xs={12} sm={6}>
            <InputLabel>{title}</InputLabel>
            {/*<Select value={} fullWidth onChange={} >*/}
            {/*    <MenuItem key={keys} value={}>*/}
            {/*        Select me*/}
            {/*    </MenuItem>*/}
            {/*</Select>*/}

        </Grid>
    )
}

export default SelectField
