import Image from "next/image";
import { FC, useState , useEffect} from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avt1.jpeg"
import {style} from "../../styles/style"
import {useUpdateAvatarMutation , useEditProfileMutation} from "../../../redux/features/user/userApi"
import {useLoadUserQuery} from "../../../redux/features/api/apiSlice"
import { toast } from 'react-hot-toast';
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser , setLoadUser] = useState(false)
  const [editProfile , {isSuccess:success , error:updateError}] = useEditProfileMutation();
  const { refetch } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          updateAvatar( avatar );
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isSuccess  || success) {
      setLoadUser(true)
    }
    if(error || updateError){
    console.log(error)
    }
    if(success){
      toast.success("Profile Updated SuccessFully")
    }
  }, [isSuccess , error , success , updateError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(name !== ""){
      await editProfile({
        name:name,
        
      })
    }
  };
  // console.log("name4" , avatarIcon)
  return (
    <>
    <div className="w-full flex justify-center">
      <div className="relative">
        <Image
          src={user?.avatar?.url }
          alt="User Avatar"
          width={120}
          height={120}
          className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
        />
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />
        <label htmlFor="avatar">
          <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            <AiOutlineCamera size={20} className="z-1" />
          </div>
        </label>
      </div>
      </div>
      <div className="w-full pl-6 800px:pl-10 dark:text-white">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 dark:text-white text-black ">Full Name</label>
              <input
                type="text"
                className={`${style.input} w-[95%] mb-4 800px:mb-0 dark:text-white `}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2  dark:text-white  text-black">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${style.input} w-[95%] mb-1 800px:mb-0 dark:text-white `}
                required
                value={user?.email}
              />
            </div>
            <input
              className="w-[100%]  h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              type="submit"
              value="Update"
            />
          </div>
        </form>
        <br/>
      </div>
      </>
  );
};

export default ProfileInfo;
