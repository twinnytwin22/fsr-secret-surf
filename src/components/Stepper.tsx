import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepConnector from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";
import { useItemClaimFlowSteps } from "../utils/constants";

interface CustomStepIconProps extends StepIconProps {
  stepIndex: string;
  activeStepLabelColor: string;
  activeStepLabelFontColor: string;
  activeStepLabelBorderColor: string;
  completeStepLabelColor: string;
  completeStepLabelFontColor: string;
  completeStepLabelBorderColor: string;
  todoStepLabelColor: string;
  todoStepLabelFontColor: string;
  todoStepLabelBorderColor: string;
}

const CustomStepIcon = ({
  stepIndex,
  active,
  activeStepLabelColor,
  activeStepLabelFontColor,
  activeStepLabelBorderColor,
  completed,
  completeStepLabelColor,
  completeStepLabelFontColor,
  completeStepLabelBorderColor,
  todoStepLabelColor,
  todoStepLabelFontColor,
  todoStepLabelBorderColor,
}: CustomStepIconProps) => {
  if (completed) {
    return (
      <Box
        component="div"
        sx={{
          background: completeStepLabelColor,
          border: `1px solid ${completeStepLabelBorderColor}`,
          width: "25px",
          height: "25px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircleIcon
          sx={{
            color: `${completeStepLabelFontColor} !important`,
            fontSize: 30,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "25px",
        height: "25px",
        borderRadius: "100px",
        border: `1px solid ${
          active ? activeStepLabelBorderColor : todoStepLabelBorderColor
        }`,
        background: active ? activeStepLabelColor : todoStepLabelColor,
        color: `${
          active ? activeStepLabelFontColor : todoStepLabelFontColor
        } !important`,
        fontSize: "14px",
      }}
    >
      {stepIndex + 1}
    </Box>
  );
};

export interface ItemClaimFlowStepperProps {
  compact?: boolean;
  activeStep: number;
  activeStepLabelColor: string;
  activeStepLabelFontColor: string;
  activeStepLabelBorderColor: string;
  completeStepLabelColor: string;
  completeStepLabelFontColor: string;
  completeStepLabelBorderColor: string;
  todoStepLabelColor: string;
  todoStepLabelFontColor: string;
  todoStepLabelBorderColor: string;
  title: string;
  connectorColor: string;
}

/**
 * Represents all the steps that a user has to go through to claim his NFT.
 */
export default function ItemClaimFlowStepper({
  compact,
  activeStep,
  activeStepLabelColor,
  activeStepLabelFontColor,
  activeStepLabelBorderColor,
  completeStepLabelColor,
  completeStepLabelFontColor,
  completeStepLabelBorderColor,
  todoStepLabelColor,
  todoStepLabelFontColor,
  todoStepLabelBorderColor,
  title,
  connectorColor,
}: ItemClaimFlowStepperProps) {
  const steps = useItemClaimFlowSteps();

  return (
    <Box component="div" sx={{ maxWidth: 700 }}>
      <Typography variant="h4" color="primary.main">
        {title}
      </Typography>

      <Stepper
        // Last step === immediately complete
        activeStep={activeStep}
        orientation="vertical"
        connector={
          compact ? null : (
            <StepConnector
              sx={{
                ".MuiStepConnector-lineVertical": {
                  borderLeft: `1px solid ${connectorColor}`,
                },
              }}
            />
          )
        }
        sx={{ mt: 2 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} expanded={true}>
            <StepLabel
              StepIconComponent={(stepIconProps) => (
                <CustomStepIcon
                  {...stepIconProps}
                  activeStepLabelColor={activeStepLabelColor}
                  activeStepLabelFontColor={activeStepLabelFontColor}
                  activeStepLabelBorderColor={activeStepLabelBorderColor}
                  completeStepLabelColor={completeStepLabelColor}
                  completeStepLabelFontColor={completeStepLabelFontColor}
                  completeStepLabelBorderColor={completeStepLabelBorderColor}
                  todoStepLabelColor={todoStepLabelColor}
                  todoStepLabelFontColor={todoStepLabelFontColor}
                  todoStepLabelBorderColor={todoStepLabelBorderColor}
                  stepIndex={index}
                />
              )}
            >
              <Typography
                variant="body2"
                fontWeight="600"
                color={
                  index < activeStep
                    ? todoStepLabelBorderColor
                    : index === activeStep
                    ? activeStepLabelBorderColor
                    : todoStepLabelBorderColor
                }
                my={0}
                ml={2}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent sx={{ borderLeft: `1px solid ${connectorColor}` }}>
              <Typography
                variant="caption"
                my={0}
                ml={2}
                component="div"
                color={
                  index < activeStep
                    ? todoStepLabelBorderColor
                    : index === activeStep
                    ? activeStepLabelBorderColor
                    : todoStepLabelBorderColor
                }
              >
                {step.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
