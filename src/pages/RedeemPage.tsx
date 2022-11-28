import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import BackToHomepage from "../components/BackToHomepage";
import ErrorView from "../components/ErrorView";
import Layout from "../components/Layout";
import LoadingView from "../components/LoadingView";
import SplitView from "../components/SplitView";
import Step1View from "../components/Step1";
import Step2View from "../components/Step2";
import Step3View from "../components/Step3";
import { useWallet } from "../services/wallet";
import { CLAIMFLOW_STEP, MediaType, QUERY_STATUS } from "../utils/constants";
import { useWindowSize } from "../utils/helpers";
import ItemClaimFlowStepper from "../components/Stepper";
import { useParams } from "react-router-dom";
import { useItemClaim } from "../services/itemClaim";
import NFTMedia from "../components/NFTMedia";

const RedeemPage = () => {
  const { claimToken = "", pinCode = "" } = useParams();
  const useItemClaimResult = useItemClaim(claimToken);
  console.log(useItemClaimResult);

  const [currentStep, setCurrentStep] = useState<string>(
    CLAIMFLOW_STEP.CONNECT_METAMASK
  );
  const [activeStep, setActiveStep] = useState<number>(
    Object.values(CLAIMFLOW_STEP).indexOf(currentStep)
  );

  const updateActiveStep = (currentStep: string) => {
    setActiveStep(Object.values(CLAIMFLOW_STEP).indexOf(currentStep));
  };

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.body.clientHeight
  );
  const { width } = useWindowSize();
  const { isConnected } = useWallet();

  useEffect(() => {
    if (!isConnected) {
      setCurrentStep(CLAIMFLOW_STEP.CONNECT_METAMASK);
      updateActiveStep(CLAIMFLOW_STEP.CONNECT_METAMASK);
    } else {
      setCurrentStep(CLAIMFLOW_STEP.VERIFY_IDENTITY_AND_CLAIM);
      updateActiveStep(CLAIMFLOW_STEP.VERIFY_IDENTITY_AND_CLAIM);
    }
  }, [isConnected]);

  return (
    <>
      <Layout>
        <BackToHomepage />
        {useItemClaimResult.status === QUERY_STATUS.error && <ErrorView />}
        {useItemClaimResult.status === QUERY_STATUS.loading && <LoadingView />}
        {useItemClaimResult.status === QUERY_STATUS.success &&
          useItemClaimResult.itemClaim && (
            <SplitView
              left={
                currentStep === CLAIMFLOW_STEP.CONNECT_METAMASK ? (
                  <Step1View />
                ) : currentStep === CLAIMFLOW_STEP.VERIFY_IDENTITY_AND_CLAIM ? (
                  <Step2View
                    pinFromUrl={pinCode}
                    {...useItemClaimResult}
                    advanceToPreviousStep={() => {
                      setCurrentStep(CLAIMFLOW_STEP.CONNECT_METAMASK);
                      setActiveStep(activeStep - 1);
                    }}
                    advanceToNextStep={() => {
                      setCurrentStep(CLAIMFLOW_STEP.SUCCESSFULLY_CLAIMED);
                      setActiveStep(activeStep + 1);
                    }}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                  />
                ) : currentStep === CLAIMFLOW_STEP.SUCCESSFULLY_CLAIMED ? (
                  <Step3View itemClaim={useItemClaimResult.itemClaim} />
                ) : (
                  <></>
                )
              }
              right={
                <>
                  {currentStep === CLAIMFLOW_STEP.SUCCESSFULLY_CLAIMED && (
                    <NFTMedia
                      type={MediaType.image}
                      image={
                        useItemClaimResult.itemClaim.item.media.image?.original
                      }
                    />
                  )}
                  <ItemClaimFlowStepper
                    activeStepLabelColor="black"
                    activeStepLabelFontColor="white"
                    activeStepLabelBorderColor="black"
                    completeStepLabelColor="transparent"
                    completeStepLabelFontColor="black"
                    completeStepLabelBorderColor="transparent"
                    todoStepLabelColor="transparent"
                    todoStepLabelFontColor="#A0A3BD"
                    todoStepLabelBorderColor="#A0A3BD"
                    activeStep={activeStep}
                    title={
                      currentStep === CLAIMFLOW_STEP.SUCCESSFULLY_CLAIMED
                        ? "All Done!"
                        : "What's Next"
                    }
                    connectorColor="black"
                  />
                </>
              }
            />
          )}
      </Layout>
      {currentStep === CLAIMFLOW_STEP.SUCCESSFULLY_CLAIMED && (
        <Confetti
          height={scrollHeight}
          width={width}
          numberOfPieces={50}
          gravity={0.04}
        />
      )}
    </>
  );
};

export default RedeemPage;
