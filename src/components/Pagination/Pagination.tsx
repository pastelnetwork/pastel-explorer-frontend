import ReactPaginate from 'react-paginate';

import * as Styles from './Pagination.styles';

interface IPaginationProps {
  totalPage: number;
  pageRangeDisplayed?: number;
  nextLabel?: React.ReactNode;
  previousLabel?: React.ReactNode;
  breakLabel?: React.ReactNode;
  onPageChange?: (_page: number) => void;
  defaultPage?: number;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPage,
  pageRangeDisplayed = 3,
  nextLabel = '>',
  previousLabel = '<',
  breakLabel = '...',
  onPageChange,
  defaultPage = 0,
}) => {
  const handlePageClick = (event: { selected: number }) => {
    if (onPageChange) {
      onPageChange(event.selected);
    }
  };
  return (
    <Styles.Wrapper>
      <ReactPaginate
        breakLabel={breakLabel}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
        onPageChange={handlePageClick}
        pageRangeDisplayed={pageRangeDisplayed}
        pageCount={totalPage}
        forcePage={defaultPage}
      />
    </Styles.Wrapper>
  );
};

export default Pagination;
