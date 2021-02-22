import {commerce} from "../lib/commerce";

export const fetchCountries = async () => {
    const { countries } = await commerce.products.list();
}

