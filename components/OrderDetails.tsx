import { Box, Divider, Typography } from "@mui/material";
import moment from "moment";

interface OrderItemProps {
  title: string;
  content: any;
}

const OrderItem = ({ title, content }: OrderItemProps) => {
  return (
    <Box sx={{ my: 3 }}>
      <Typography component="div" variant="overline" my={0}>
        {title}
      </Typography>
      <Typography
        component="div"
        variant="subtitle2"
        my={0}
        color="text.secondary"
      >
        {content}
      </Typography>
    </Box>
  );
};

interface OrderDetailProp {
  tokenId: number;
}

const OrderDetail = ({ tokenId }: OrderDetailProp) => {
  return (
    <Box>
      <Divider color="text.secondary" sx={{ m: 0 }}>
        <Typography color="text.secondary" variant="subtitle2" fontWeight={600}>
          Order Details
        </Typography>
      </Divider>

      <OrderItem title="Date" content={moment.unix(Date.now()).format("lll")} />
      <OrderItem title="Email" content={localStorage.getItem("email")} />
    </Box>
  );
};

export default OrderDetail;
