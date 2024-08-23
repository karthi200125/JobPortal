import AboutMe from "../AboutMe"
import Education from "../Education"
import MoreProfiles from "../MoreProfiles"
import UserInfo from "../UserInfo"

const UserProfile = () => {
  return (
    <div className="min-h-screen w-full flex flex-row items-start gap-5 py-5">
      <div className="w-[70%] h-full space-y-5">
        <UserInfo />
        <AboutMe />
        <Education />
      </div>
      <div className="w-[30%] h-full">
        <MoreProfiles />
      </div>
    </div>
  )
}

export default UserProfile