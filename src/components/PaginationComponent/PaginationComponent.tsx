import React, {useEffect} from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { tableActions } from '../../redux/slices/tableSlice';
import {useSearchParams} from "react-router-dom";

const PaginationComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { next, previous,totalPages } = useAppSelector((state) => state.tableReducer);
    const [query, setQuery] = useSearchParams();

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages) {
            setQuery({ page: newPage.toString() });
        }
    };

    useEffect(() => {
        const pageQueryParam = +query.get('page')!!;
        if (pageQueryParam) {
            dispatch(tableActions.loadNextPage(pageQueryParam));
        }
    }, [dispatch, query]);



    return (
        <div className="pagination">
            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(+query.get('page')!! - 1)}
                disabled={!previous}
            >
                {'<'}
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant="contained"
                    color={i === +query.get('page')!! ? 'primary' : undefined}
                    onClick={() => handlePageChange(i+1)}
                    disabled={i+1 === +query.get('page')!!}
                >
                    {i+1}
                </Button>
            ))}

            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(+query.get('page')!! + 1)}
                disabled={!next}
            >
                {'>'}
            </Button>
        </div>
    );
};

export { PaginationComponent };
