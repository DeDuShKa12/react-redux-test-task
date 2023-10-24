import React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { tableActions } from '../../redux/slices/tableSlice';

const PaginationComponent: React.FC = () => {
    const dispatch = useAppDispatch();
    const { next, previous,totalPages, currentPage } = useAppSelector((state) => state.tableReducer);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage <= totalPages) {
            dispatch(tableActions.setCurrentPage(newPage));
            dispatch(tableActions.loadNextPage(newPage));
        }
    };

    return (
        <div className="pagination">
            <Button
                variant="contained"
                color="primary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!previous}
            >
                {'<'}
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant="contained"
                    color={i === currentPage ? 'primary' : undefined}
                    onClick={() => handlePageChange(i)}
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
