import useSWR from 'swr';
import { decode } from 'js-base64';

import * as ascii85 from '@utils/helpers/ascii85';
import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import {
  INftDetails,
  INftRegistrationTicket,
  INftTicket,
  IAppTicket,
  TItemActivity,
} from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';

const decodeTicket = (ticketData: string) => {
  let data = null;
  try {
    data = JSON.parse(decode(ticketData));
  } catch {
    try {
      data = ascii85.decode(ticketData);
    } catch (error) {
      console.error(error);
    }
  }

  return data;
};

export default function useNftDetails(txid: string) {
  const { data, isLoading } = useSWR<{ nft: INftDetails }>(
    `${URLS.GET_NFT_DETAILS_URL}?registration_ticket_txid=${txid}`,
    axiosGet,
    SWR_OPTIONS,
  );

  if (data?.nft?.memberSince) {
    const ticket = JSON.parse(data.nft.rawData).ticket as INftRegistrationTicket;
    const otherData = JSON.parse(data.nft.otherData);
    const nftTicket = decodeTicket(ticket?.nft_ticket) as INftTicket;
    const appTicket = decodeTicket(nftTicket?.app_ticket) as IAppTicket;
    const nftData = {
      green: ticket?.green,
      royalty: ticket?.royalty,
      totalCopies: ticket?.total_copies,
      author: nftTicket.author,
      creatorName: appTicket?.creator_name || '',
      creatorWebsite: appTicket?.creator_website,
      creatorWrittenStatement: appTicket?.creator_written_statement,
      nftTitle: appTicket?.nft_title,
      nftType: appTicket?.nft_type,
      nftSeriesName: appTicket?.nft_series_name,
      nftCreationVideoYoutubeUrl: appTicket?.nft_creation_video_youtube_url,
      nftKeywordSet: appTicket?.nft_keyword_set,
      dataDash: appTicket?.data_hash,
      originalFileSizeInBytes: appTicket?.original_file_size_in_bytes,
      fileType: appTicket?.file_type,
      makePubliclyAccessible: appTicket?.make_publicly_accessible,
      ddAndFingerprintsIc: appTicket?.dd_and_fingerprints_ic,
      ddAndFingerprintsMax: appTicket?.dd_and_fingerprints_max,
      ddAndFingerprintsIds: appTicket?.dd_and_fingerprints_ids,
      rqIc: appTicket?.rq_ic,
      rqMax: appTicket?.rq_max,
      rqIds: appTicket?.rq_ids,
      rqOti: appTicket?.rq_oti,
      collectionName: otherData?.collectionName,
      collectionAlias: otherData?.collectionAlias,
      transactionHash: data?.nft?.transactionHash,
      transactionTime: data?.nft?.transactionTime,
      username: data?.nft?.username,
      memberSince: data?.nft?.memberSince,
      image: '',
    };

    return {
      nftData,
      isLoading,
    };
  }
  return {
    nftData: null,
    isLoading,
  };
}

export function useItemActivity(txid: string, offset: number, limit: number) {
  const { data, isLoading } = useSWR<{ items: TItemActivity[]; totalItems: number }>(
    `${URLS.GET_ITEM_ACTIVITY_OF_NFT_DETAILS_URL}?registration_ticket_txid=${txid}&offset=${offset}&limit=${limit}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.items || null,
    totalItems: data?.totalItems || 0,
    isLoading,
  };
}
