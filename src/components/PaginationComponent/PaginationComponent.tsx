import React, { FC, useEffect } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { tableActions } from '../../redux/slices/tableSlice';
import { useSearchParams } from 'react-router-dom';

const PaginationComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { next, previous, totalPages } = useAppSelector((state) => state.tableReducer);
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

    const currentPage = +query.get('page')!!;

    return (
        <div className="pagination">
            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!previous || currentPage === 1}
            >
                {'<'}
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant="contained"
                    color={i === currentPage - 1 ? 'primary' : undefined}
                    onClick={() => handlePageChange(i + 1)}
                    disabled={i + 1 === currentPage}
                >
                    {i + 1}
                </Button>
            ))}

            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!next}
            >
                {'>'}
            </Button>
        </div>
    );
};

export { PaginationComponent };
