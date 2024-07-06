'use-client';
import React, { FC } from 'react';
import { style } from '../../../styles/style';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-hot-toast';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({ benefits = [], setBenefits, prerequisites = [], setPrerequisites, active, setActive }) => {
    const handleBenefitChange = (index: number, value: string) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };

    const handlePrerequisiteChange = (index: number, value: string) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };

    const handleAddBenefit = () => {
        setBenefits([...benefits, { title: "" }]);
    };

    const handleAddPrerequisite = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields to proceed to the next step!");
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${style.label} text-[20px]`} htmlFor="benefits">
                    What are the benefits for students in this course?
                </label>
                <br />
                {benefits?.map((benefit, index) => (
                    <input
                        type="text"
                        key={index}
                        name="benefit"
                        required
                        className={`${style.input} my-2`}
                        value={benefit.title}
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        placeholder="You will be able to build a full stack LMS Platform"
                    />
                ))}
                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefit}
                />
            </div>
            <div>
                <label className={`${style.label} text-[20px]`} htmlFor="prerequisites">
                    What are the prerequisites for students in this course?
                </label>
                <br />
                {prerequisites?.map((prerequisite, index) => (
                    <input
                        type="text"
                        key={index}
                        name="prerequisite"
                        required
                        className={`${style.input} my-2`}
                        value={prerequisite.title}
                        onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                        placeholder="You will need to know some basics"
                    />
                ))}
                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddPrerequisite}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                    onClick={prevButton}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                    onClick={handleOptions}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;
