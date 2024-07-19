import { useSearchParams } from "react-router-dom";
type Props = {
  count: number;
};
export function Pagination(props: Props) {
  //TODO: show a max of 10 links with 3 dots if there are more than 10 pages
  const [_searchParams, setSearchParams] = useSearchParams();
  let totalPage = Math.ceil(props.count / 10);
  const onChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  return (
    <div>
      {[...Array(totalPage)].map((_y, page) => (
        <button
          className="m-1"
          key={`button-${page + 1}`}
          onClick={() => onChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
}
