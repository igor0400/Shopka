import { useState, useEffect } from 'react';

import FiltersAccordion from './FiltersAccordion';
import FiltersAccordionPrice from './FiltersAccordionPrice';

import { Stack, Skeleton } from '@mui/material';

import { useGetProductsQuery } from '../../../slices/apiSlice';

const Filters = () => {
    const [filtersSettings, setFiltersSettings] = useState([]);

    const {
        data: productsData = {},
        isLoading,
        isError,
    } = useGetProductsQuery();

    useEffect(() => {
        if (productsData && !isLoading && !isError) {
            const filters = {};

            const postNewFilter = (item, name, type) => {
                if (filters[type]) {
                    const items = filters[type].items;

                    if (!items.includes(item)) {
                        filters[type].items = [...items, item];
                    }
                } else {
                    filters[type] = { items: [item], name, type };
                }
            };

            for (let key in productsData) {
                const { brand } = productsData[key];

                postNewFilter(brand, 'Brand', 'brand');
            }

            const filtersArr = [];

            for (let key in filters) {
                filtersArr.push({
                    name: filters[key].name,
                    listItems: filters[key].items,
                    type: filters[key].type,
                });
            }

            setFiltersSettings(filtersArr);
        }
    }, [productsData]);

    return (
        <Stack sx={{ width: '300px' }} spacing={1}>
            {isLoading || isError ? (
                <Stack>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                        <Skeleton
                            key={i}
                            animation="wave"
                            variant="text"
                            sx={{ fontSize: '30px', width: '300px' }}
                        />
                    ))}
                </Stack>
            ) : (
                <>
                    {filtersSettings.map((item, i) => (
                        <FiltersAccordion key={i} {...item} />
                    ))}
                    <FiltersAccordion
                        name="Rating"
                        type="rating"
                        listItems={[
                            '1 star',
                            '2 stars',
                            '3 stars',
                            '4 stars',
                            '5 stars',
                        ]}
                    />
                    <FiltersAccordionPrice name="Price, $" type="price" />
                </>
            )}
        </Stack>
    );
};

export default Filters;
