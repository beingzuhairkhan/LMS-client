import React, { FC, useState, useEffect } from 'react';
import { useGetHeroDataQuery, useEditLayoutMutation } from '../../../../redux/features/layout/layoutApi';
import { style } from '../../../styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import Loader from '../../../components/Loader/Loader';

type Props = {};

const EditCategories: FC<Props> = () => {
    const { data, refetch } = useGetHeroDataQuery("FAQ", { refetchOnMountOrArgChange: true });
    const [editLayout, { isLoading, isSuccess: categoriesSuccess, error }] = useEditLayoutMutation();
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setCategories(data?.layout?.categories);
        }
        if(categoriesSuccess){
            refetch()
            toast.success("Category Updated SuccessFully")
        }
        if(error){
            toast.success("Category Updated Failed")
        }
    }, [data , categoriesSuccess , error]);

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category._id === id ? { ...category, title: value } : category
            )
        );
    };

    const newCategoriesHandler = () => {
        if (categories[categories.length - 1]?.title === "") {
            toast.error("Category title cannot be empty");
        } else {
            setCategories((prevCategories) => [
                ...prevCategories,
                { _id: Math.random().toString(36).substr(2, 9), title: "" }
            ]);
        }
    };

    const areCategoriesUnchanged = (initialCategories: any[], currentCategories: any[]) => {
        return JSON.stringify(initialCategories) === JSON.stringify(currentCategories);
    };

    const isAnyCategoryTitleEmpty = (categories: any[]) => {
        return categories.some((category) => category.title === "");
    };

    const editCategoriesHandler =async () => {
    if(!areCategoriesUnchanged(data.layout.categories , categories) && !isAnyCategoryTitleEmpty(categories)){

        await  editLayout({ 
            type:"Categories",
            categories
         });
    }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mt-[120px] text-center">
                    <h1 className={`${style.title}`}>All Categories</h1>
                    {categories &&
                        categories.map((item: any, index: number) => (
                            <div className="p-3" key={item._id}>
                                <div className="flex items-center w-full justify-center">
                                    <input
                                        className={`${style.input} !w-[unset] !border-none !text-[20px]`}
                                        value={item.title}
                                        onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                                        placeholder="Enter Category title..."
                                    />
                                    <AiOutlineDelete
                                        className="dark:text-white text-black text-[18px] cursor-pointer"
                                        onClick={() => {
                                            setCategories((prevCategories) =>
                                                prevCategories.filter((category) => category._id !== item._id)
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    <br />
                    <br />
                    <div className="w-full flex justify-center">
                        <IoMdAddCircleOutline
                            className="dark:text-white text-black text-[25px] cursor-pointer"
                            onClick={newCategoriesHandler}
                        />
                    </div>
                    <div
                        className={`${style.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                            areCategoriesUnchanged(data?.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories)
                                ? "!cursor-not-allowed"
                                : "!cursor-pointer !bg-[#42d383]"
                        } !rounded absolute bottom-12 right-12`}
                        onClick={
                            areCategoriesUnchanged(data?.layout?.categories, categories) || isAnyCategoryTitleEmpty(categories)
                                ? () => null
                                : editCategoriesHandler
                        }
                    >
                        Save
                    </div>
                </div>
            )}
        </>
    );
};

export default EditCategories;
