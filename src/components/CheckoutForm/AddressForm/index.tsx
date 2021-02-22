import * as React from 'react';
import {FC, useEffect} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {Grid} from "@material-ui/core";
import InputText from "../InputText";
import SelectField from "../SelectField";

type Props = {
    fetchCountries: () => void
    token: any
};

const AddressForm: FC<Props> = (fetchCountries, token): JSX.Element => {
    const methods = useForm()

    useEffect(()=> {
        fetchCountries(token.id)
    }, [])

    return (
        <>
            <FormProvider {...methods}>
                <form>
                    <Grid container spacing={3}>
                        <InputText name="firstName" label="First name" />
                        <InputText name="lastName" label="Last name" />
                        <InputText name="address" label="Address" />
                        <InputText name="email" label="Email" />
                        <InputText name="city" label="City" />
                        <InputText name="zip" label="ZIP / Postal code" />
                        <SelectField title="Country" />
                        {/*<SelectField title="Subdivision" />*/}
                        {/*<SelectField title="Options" />*/}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
