import { useState } from "react";
import BackToHomepage from "../components/BackToHomepage";
import Layout from "../components/Layout";
import SplitView from "../components/SplitView";
import { CLAIMFLOW_STEP, MediaType } from "../utils/constants";
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import theme from "../theme";
import NFTMedia from "../components/NFTMedia";
import { Intro } from "./LandingPage";
import { Form, Formik } from "formik";
import * as yup from "yup";
import ItemSnippet from "../components/ItemSnippet";
import ItemClaimFlowStepper from "../components/Stepper";
import OrderDetail from "../components/OrderDetails";
import { useMutation } from "@tanstack/react-query";
import { createEmailClaim } from "../services/emailClaim";

interface ClaimFormValues {
  email: string;
  consent: boolean;
}

const initialValues: ClaimFormValues = {
  email: "",
  consent: false,
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .test(
      "valid-consensys-email",
      "Please provide a valid ConsenSys email.",
      (value) => value!.endsWith("@consensys.net")
    )
    .required("Please provide a valid ConsenSys email."),
  consent: yup
    .boolean()
    .test(
      "must-be-true",
      "You must agree to the privacy policy above.",
      (value) => !!value
    ),
});

const ClaimPage = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [error, setError] = useState("");

  const { mutate: submitEmail } = useMutation(
    ({ email }: ClaimFormValues) => createEmailClaim(email),
    {
      onSuccess: (data, variables) => {
        setCurrentStep(CLAIMFLOW_STEP.CHECK_EMAIL);
      },
      onError: (e: any) => {
        console.error(e);
        setError(e?.response.data.error ?? "Something went wrong");
      },
    }
  );

  const [currentStep, setCurrentStep] = useState<string | null>(null);

  return (
    <Layout>
      <BackToHomepage />

      {currentStep === CLAIMFLOW_STEP.CHECK_EMAIL ? (
        <SplitView
          left={
            <>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
                Claim info sent!
              </Typography>
              <Typography variant="body1">
                You will receive an email with proof of your NFT claim and the
                steps on how to add your NFT to a wallet.
              </Typography>
              <ItemSnippet tokenId={0} />
              <OrderDetail tokenId={0} />
            </>
          }
          right={
            <>
              <ItemClaimFlowStepper
                activeStepLabelColor="black"
                activeStepLabelFontColor="white"
                activeStepLabelBorderColor="black"
                completeStepLabelColor="black"
                completeStepLabelFontColor="transparent"
                completeStepLabelBorderColor="black"
                todoStepLabelColor="transparent"
                todoStepLabelFontColor="#A0A3BD"
                todoStepLabelBorderColor="#A0A3BD"
                activeStep={0}
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
      ) : (
        <SplitView
          left={
            <>
              <Typography variant="h4" sx={{ color: "primary.main" }}>
                Begin your claim
              </Typography>
              <Typography variant="body1">
                Provide your current consensys.net email below to claim your
                NFT. The NFT is free, limited to one per person.
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(params) => submitEmail(params)}
                validateOnBlur
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  setFieldTouched,
                }) => (
                  <Form>
                    <TextField
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      placeholder="ConsenSys Email"
                      onChange={handleChange}
                      error={!!errors.email && !!touched.email}
                      helperText={!!touched.email && errors.email}
                      onBlur={() => setFieldTouched("email", true)}
                      fullWidth
                    />
                    <FormControl error={!!errors.consent && !!touched.consent}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="consent"
                            checked={values.consent}
                            onChange={handleChange}
                            onBlur={() => setFieldTouched("consent", true)}
                          />
                        }
                        label={
                          <Typography variant="caption" lineHeight={1}>
                            I agree to the terms as described in the{" "}
                            <Link
                              underline="hover"
                              href="https://consensys.net/privacy-policy"
                              rel="noopener noreferrer"
                            >
                              privacy policy
                            </Link>
                          </Typography>
                        }
                      />
                      <FormHelperText>
                        {!!touched.consent && errors.consent}
                      </FormHelperText>
                    </FormControl>
                    <Button
                      type="submit"
                      variant="outlined"
                      sx={{
                        p: 3,
                        width: isMobileOrTablet ? 1 : 320,
                        mb: 2,
                      }}
                      disabled={!!errors.email || !!errors.consent}
                    >
                      Continue
                    </Button>
                  </Form>
                )}
              </Formik>
              {error && <Alert severity="error">{error}. </Alert>}
            </>
          }
          right={
            <>
              <NFTMedia type={MediaType.placeholder} />
              <Intro />
            </>
          }
        />
      )}
    </Layout>
  );
};

export default ClaimPage;
