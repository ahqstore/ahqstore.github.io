import { BsExclamationCircleFill } from "react-icons/bs"

export default function Err() {
  return (
    <div className="tw-mt-5 user-err">
      <BsExclamationCircleFill />
      <h2 className="tw-block">Something went wrong!</h2>
      <h5>Unable to get user info, maybe the user doesn't exist?</h5>
    </div>
  )
}