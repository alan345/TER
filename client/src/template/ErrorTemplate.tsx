type Props = {
  message: string;
};
export const ErrorTemplate = (props: Props) => {
  return <div>Error: {props.message}</div>;
};
