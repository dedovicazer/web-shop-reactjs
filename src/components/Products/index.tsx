import * as React from 'react';
import { FC, useEffect } from 'react';
// @ts-ignore
import { Survey } from 'srvy-react-client';
import Grid from '@material-ui/core/Grid';
import Product from './Product';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchProducts } from '../../redux/productsSlice';
import { fetchCart } from '../../redux/cartSlice';

type Props = {};

const Products: FC<Props> = (): JSX.Element => {
  const configuration = {
    surveyId: 13,
    questions: [
      {
        questionId: '05a00b71-8e7c-448b-a7be-e608b511ef80',
        type: 1,
        questionText: 'How old are you?',
      },
      {
        questionId: 'bcf8256c-74c8-410f-b8d1-7ead84021dd0',
        type: 2,
        questionText: 'Which mobile brand do you prefer the most?',
        options: [
          { key: 'Apple', value: '8c3a8f2f-d21d-4b65-bad5-21725b6c3173' },
          { key: 'Samsung', value: 'fb64e923-1da3-490e-b2eb-a6b3e1fe9918' },
          { key: 'Huawei', value: '3940d09e-c4b0-47ea-bc76-2e9b56fdaeb3' },
          { key: 'Other', value: '3a2e319b-78fd-4ce2-8377-6db77bff6c12' },
        ],
      },
    ],
  };

  const { products } = useSelector(
    (state: RootState) => state.rootReducer.products,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, []);

  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Survey configuration={configuration} />
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
