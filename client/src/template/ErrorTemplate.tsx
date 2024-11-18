type Props = {
  message: string
}
const ErrorTemplate = (props: Props) => {
  return <div>Error: {props.message}</div>
}
export default ErrorTemplate
