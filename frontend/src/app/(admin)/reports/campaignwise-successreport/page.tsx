import React from "react";
import PageTitle from "@/components/PageTitle";
import CampaignWiseReport from "./CampaignWiseSuccessReport"
import CampaignWiseSuccessReport from "./CampaignWiseSuccessReport";

const CampaignWiseReportPage =()=>{
    return (
        <>
        <PageTitle title="Campaign Success Report"/>
        <CampaignWiseSuccessReport/>
        </>
    )

};

export default CampaignWiseReportPage;