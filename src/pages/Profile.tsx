import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  const { address, contract, getCampaigns, text } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);

    try {
      const data = await getCampaigns();

      setCampaigns(data);
      setfilteredData(data); // Set filteredData to the initial campaigns data
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const data = campaigns.filter((campaign: any) =>
      campaign.title.toLowerCase().includes(text.toLowerCase())
    );
    setfilteredData(data);
  }, [text]);

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns
      campaigns={filteredData}
      isLoading={isLoading}
      title="All campaigns"
    />
  );
};

export default Profile;
