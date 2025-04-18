import type { Media, User } from "@/payload-types"
import Image from "next/image"

type AvatarProps = {
  user: User
  size?: number // optional, Standardwert ist 75
}

export const Avatar = ({ user, size = 75 }: AvatarProps) => {
  const avatar = user?.avatar as Media

  if (avatar?.url) {
    return (
      <Image
        src={avatar.url as string}
        alt={avatar.alt || "avatar"}
        height={size}
        width={size}
        style={{ borderRadius: "50%" }}
      />
    )
  } else {
    return (
      <svg
        className="graphic-account"
        width={size}
        height={size}
        viewBox="0 0 25 25"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: "50%" }}
      >
        <circle className="graphic-account__bg" cx="12.5" cy="12.5" r="11.5" />
        <circle className="graphic-account__head" cx="12.5" cy="10.73" r="3.98" />
        <path
          className="graphic-account__body"
          d="M12.5, 24a11044,11.44,0,0,0,7.77-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z"
        />
      </svg>
    )
  }
}

export default Avatar

/*
import type {Media, User} from "@/payload-types"
import Image from "next/image"

export const Avatar = ({user}: {user:User}) => {
  const avatar = user?.avatar as Media

  if (avatar) {
    return (
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/${avatar.filename}`}
        alt={avatar.alt || "User avatar"}
        height={25}
        width={25}
        style={{borderRadius: "50%"}}
      />
    )
  } else {
    return (
      <svg className="graphic-account" height="25" viewBox="0 0 25 25" width="25" xmlns="http://www.w3.org/2000/svg">
        <circle className="graphic-account__bg" cx="12.5" cy="12.5" r="11.5" />
        <circle className="graphic-account__head" cx="12.5" cy="10.73" r="3.98" />
        <path className="graphic-account__body" d="M12.5, 24a11044,11.44,0,0,0,7.77-2.94c-.5-2.71-3.73-4.8-7.66-4.8s-7.16,2.09-7.66,4.8A11.44,11.44,0,0,0,12.5,24Z" />
      </svg>
    )
  }
}

export default Avatar

 */
