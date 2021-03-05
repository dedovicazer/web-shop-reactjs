import {Grid, TextField} from '@material-ui/core';
import * as React from 'react';
import {FC} from "react";
import {Controller, useForm, useFormContext} from 'react-hook-form';

type Props = {
    name: string
    label: string
    required?: boolean
};

const InputText: FC<Props> = ({name, label, required}): JSX.Element => {
    const {control} = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller as={TextField}
                        control={control}
                        fullWidth
                        name={name}
                        label={label}
                        required
            />

        </Grid>
    )
}

export default InputText
