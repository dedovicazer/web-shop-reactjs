import * as React from 'react';
import {FC} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {Button, Grid} from "@material-ui/core";
import InputText from "../InputText";
import SelectField from "../SelectField";
import {setCountry, setSubdivision, setOption} from "../../../redux/selectFieldSlice";
import {Link} from "react-router-dom";

type Props = {
    countries: {}
    country: string
    subdivision: string
    subdivisions: any
    option: string
    options: any
    next: ({}) => void
};

const AddressForm: FC<Props> = ({ countries, country, subdivision, subdivisions, option, options, next }): JSX.Element => {
    const methods = useForm()

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, country, subdivision, option}))}>
                    <Grid container spacing={3}>
                        <InputText name="firstname" label="First name"/>
                        <InputText name="lastname" label="Last name"/>
                        <InputText name="address" label="Address"/>
                        <InputText name="email" label="Email"/>
                        <InputText name="city" label="City"/>
                        <InputText name="zip" label="ZIP / Postal code"/>
                        <SelectField title="Country" values={countries} value={country} setValue={setCountry}/>
                        <SelectField title="Subdivision"  values={subdivisions} value={subdivision} setValue={setSubdivision} />
                        <SelectField title="Options"  values={options} value={option} setValue={setOption} />
                    </Grid>
                    <br />
                    <div style={{display: "flex" , justifyContent: "space-between"}}>
                        <Button component={Link} to={"/cart"} variant={"outlined"}>
                            Back to cart
                        </Button>

                        <Button variant={"contained"} type={"submit"} color={"primary"}>
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
