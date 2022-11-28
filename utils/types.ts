import { UseMutateFunction } from "@tanstack/react-query";
import { BigNumberish, BytesLike } from "ethers";

export interface TokenContract {
  address: string;
  network_id: number;
  symbol: string;
  token_type: "ERC721" | "ERC1155";
}

export interface ERC20Token {
  address: string;
  decimals: number;
  symbol: string;
}

export interface Item {
  id: string;
  title: string;
  attributes: any;
  token_contract: TokenContract;
  token_id: string;
  collection_id: string;
  listing: Listing;
  media: ItemMedia;
}

export interface Listing {
  data: SetPriceListingData &
    OnchainAuctionListingData &
    FiatSetPriceListingData;
  type: "SET_PRICE" | "ONCHAIN_ENGLISH_AUCTION";
}

export interface SetPriceListingData {
  order: Order;
  signature: BytesLike;
  quantity_listed: number;
  quantity_remaining: number;
}

export interface Order {
  expiry: BigNumberish;
  nonce: BigNumberish;
  makerAddress: string;
  takerAddress: string;
  makerToken: Token;
  takerToken: Token;
  payoutTo: string[];
  payoutAmount: BigNumberish[];
}

export type Token = {
  kind: BigNumberish;
  token: string;
  id: BigNumberish;
  amount: BigNumberish;
};

export interface FiatSetPriceListingData {
  id: string;
  price: string;
  currency: string;
  quantity_listed: number;
  quantity_remaining: number;
  providers: FiatProviders;
}

export interface FiatProviders {
  stripe: any;
  coinbase_commerce: any;
}

export interface OnchainAuctionListingData {
  id: string;
  auction_id: number;
  duration: number;
  end_time: string;
  extension_window: number;
  min_bid_increment_bps: number;
  start_time: string;
  starting_bid: string;
  status: string;
  currency: ERC20Token;
  winning_bid?: {
    bid_amount: string;
    bidder: string;
  };
}

export interface ItemMedia {
  image?: ImageMedia;
}

export interface ImageMedia {
  original: string;
  full?: string;
  thumb?: string;
  tiny?: string;
}

export interface ItemClaim {
  token: string;
  item: Item;
  quantity: number;
  is_claimed: boolean;
  is_active: boolean;
}

export interface UseItemClaimResult {
  itemClaim: ItemClaim;
  status: string;
  statusErrorMessage: string;

  verifyItemClaim: UseMutateFunction<any, unknown, string, unknown>;
  verifyItemClaimStatus: string;
  verifyItemClaimStatusErrorMessage: string;

  redeemItemClaim: UseMutateFunction<any, unknown, string, unknown>;
  redeemItemClaimStatus: string;
  redeemItemClaimStatusErrorMessage: string;
}
