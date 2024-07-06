import React, { FC, useState, useEffect } from 'react'
import { useGetHeroDataQuery , useEditLayoutMutation } from '../../../../redux/features/layout/layoutApi'
import { style } from '../../../styles/style'
import { AiOutlineCamera } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
type Props = {}

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("")
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const { data, refetch } = useGetHeroDataQuery("Banner", { refetchOnMountOrArgChange: true })
  const [editLayout , {isLoading , isSuccess , error}] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title)
      setSubTitle(data?.layout?.banner.subTitle)
      setImage(data?.layout?.banner?.image?.url)
    }
    if(isSuccess){
      refetch()
      toast.success("Hero Updated SuccessFully");
    }
    if(error){
      toast.error("Hero Updated Failed");
    }
  }, [data , isSuccess , error])

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = (e:any) => {
          if(reader.readyState === 2){
            setImage(e.target.result as string);
          }
           
        };
        reader.readAsDataURL(file);
    }
  }

  const handleEdit = async() => {
   await editLayout({
    type:"Banner",
    image,
    title,
    subTitle
   })
  }

  return (
    <div className="w-full flex flex-col xl:flex-row justify-center items-center mt-10 xl:mt-20">
      <div className="relative w-full xl:w-1/2 flex justify-center gap-[50px] xl:justify-start mb-10 xl:mb-0">
        <div className="relative w-[400px] h-[400px] xl:w-[600px] xl:h-[500px]  overflow-hidden flex justify-center items-center ">
          {image ? (
            <img src={image} alt="Banner" className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
          <input type="file" id="banner" accept="image/*" onChange={handleUpdate} className="hidden" />
          <label htmlFor="banner" className="absolute bottom-4 right-4 rounded-full">
            <AiOutlineCamera className="text-white text-[24px]" />
          </label>
        </div>
      </div>
      <div className="w-full xl:w-1/2 flex flex-col items-center xl:items-start text-center xl:text-left px-4">
        <textarea
          className="dark:text-white text-[#000000c7] text-[20px] xl:text-[30px] 2xl:text-[40px] px-3 py-2 w-full max-w-[500px] rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Improve your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
        />
        <textarea
          className="dark:text-white text-[#000000c7] text-[18px] xl:text-[24px] 2xl:text-[30px] px-3 py-2 w-full max-w-[500px] rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={2}
        />
        <div
          className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"
          } !rounded mt-4`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image ? handleEdit : () => null
          }
        >
          Save
        </div>
      </div>
    </div>
  )
}

export default EditHero
