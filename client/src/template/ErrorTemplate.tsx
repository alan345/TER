type Props = {
  message: string
}
const ErrorTemplate = (props: Props) => {
  return <div className="p-6">Error: {props.message}</div>
}
export default ErrorTemplate
