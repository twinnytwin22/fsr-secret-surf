import {
  Box,
  Button as MUIButton,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Button = ({
  onClick,
  children,
  compact,
  sx,
}: {
  onClick: () => any;
  children: React.ReactNode;
  compact?: boolean;
  sx?: SxProps<Theme>;
}) => {
  return compact ? (
    <MUIButton
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "black",
        borderColor: "black",
        backgroundColor: "transparent",
        p: 1,
        fontSize: 10,
        width: 120,
        ...sx,
      }}
    >
      {children}
    </MUIButton>
  ) : (
    <MUIButton
      variant="outlined"
      onClick={onClick}
      sx={{
        color: "black",
        borderColor: "black",
        backgroundColor: "transparent",
        ...sx,
      }}
    >
      {children}
    </MUIButton>
  );
};

export const WalletButton = ({
  compact = false,
  sx,
}: {
  compact?: boolean;
  sx?: SxProps<Theme>;
}) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <Box
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} compact={compact} sx={sx}>
                    Connect Wallet
                  </Button>
                );
              }

              if (chain!.unsupported) {
                return (
                  <Button onClick={openChainModal} compact={compact} sx={sx}>
                    Wrong Network
                  </Button>
                );
              }
              return (
                <Button onClick={openAccountModal} compact={compact} sx={sx}>
                  {account?.displayName}
                  {account?.displayBalance && !isMobileOrTablet
                    ? ` (${account?.displayBalance})`
                    : ""}
                </Button>
              );
            })()}
          </Box>
        );
      }}
    </ConnectButton.Custom>
  );
};
