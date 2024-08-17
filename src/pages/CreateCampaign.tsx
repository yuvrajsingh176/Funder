import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton, FormField } from "../components";
import { useStateContext } from "../context";
import { ethers } from "ethers";

import { checkIfImage } from "../utils";
import Loader from "../components/Loader";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { address, connect, createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName: string, e: any) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists: any) => {
      if (exists) {
        setIsLoading(true);

        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
          owner: address as string,
          amountCollected: ethers.BigNumber.from(0),
        });

        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-4 sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white ">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Yuvraj Singh"
            inputType="text"
            value={form.name}
            handleChange={(e: any) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a Title"
            inputType="text"
            value={form.title}
            handleChange={(e: any) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your Story"
          value={form.description}
          handleChange={(e: any) => handleFormFieldChange("description", e)}
          isTextArea
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] rounded-[10px] h-[120px]">
          <img
            src="./assets/money.svg"
            alt="money"
            className="w-10 h-10 object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-5">
            You Will get 100% of raised amount.
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e: any) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e: any) => handleFormFieldChange("deadline", e)}
          />
          <FormField
            labelName="Campaign Image *"
            placeholder="Place Image Url of your Campaign"
            inputType="url"
            value={form.image}
            handleChange={(e: any) => handleFormFieldChange("image", e)}
          />
        </div>
        <div className="flex justify-start items-center mt-10">
          <CustomButton
            btnType="submit"
            title="Submit New Campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
