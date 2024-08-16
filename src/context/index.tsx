import React, { createContext, useContext } from "react";
import {
  BaseContractInterface,
  ConnectWallet,
  SmartContract,
  useAddress,
  useConnect,
  useContract,
  useContractWrite,
  useMetamask,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers"; // Import BigNumber if not already imported

interface ContractContextProps {
  address: string | undefined;
  connect: any;
  contract: any;
  createCampaign: (form: FormData) => Promise<void>;
  getCampaigns: any;
  getUserCampaigns: any;
  getDonations: any;
  donate: any;
}

interface FormData {
  title: string;
  description: string;
  target: BigNumber;
  deadline: string;
  image: string;
  owner: string;
  amountCollected: BigNumber;
}

const ContractContext = createContext({} as ContractContextProps);

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { contract } = useContract(
    "0xb4Bb1Ae8309Cec664A342956746ba1c2ceb6Bc46"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useConnect();

  const publicCampaign = async (form: FormData) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(Date.parse(form.deadline)).getTime(),
          form.image,
        ],
        overrides: undefined,
      });
      console.log("Contract call success", data);
    } catch (e) {
      console.log("Contract call failed", e);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns");
    const parsedCampaigns = campaigns.map((campaign: FormData, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: Number(campaign.deadline),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const campaigns = await getCampaigns();
    const filteredCampaigns = campaigns.filter(
      (campaign: FormData) => campaign.owner === address
    );
    return filteredCampaigns;
  };

  const donate = async (pId: any, amount: any) => {
    const data = await contract?.call("donateToCampaign", [pId], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (pId: any) => {
    const donations = await contract?.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  const ContractProviderValue = {
    address,
    connect,
    createCampaign: publicCampaign,
    contract,
    getCampaigns,
    getUserCampaigns,
    donate,
    getDonations,
  };

  return (
    <ContractContext.Provider value={ContractProviderValue}>
      {children}
    </ContractContext.Provider>
  );
};

export const useStateContext = (): ContractContextProps =>
  useContext(ContractContext);
