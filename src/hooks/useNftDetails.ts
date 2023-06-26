import useSWR from 'swr';

import { axiosGet } from '@utils/helpers/useFetch/useFetch';
import * as URLS from '@utils/constants/urls';
import {
  INftDetails,
  TItemActivity,
  ICollectionItem,
  TAcceptedOffer,
} from '@utils/types/ITransactions';
import { SWR_OPTIONS } from '@utils/constants/statistics';

export default function useNftDetails(txid: string) {
  const { data, isLoading } = useSWR<{ nft: INftDetails }>(
    `${URLS.GET_NFT_DETAILS_URL}?registration_ticket_txid=${txid}`,
    axiosGet,
    SWR_OPTIONS,
  );

  if (data?.nft?.transactionHash) {
    const nftData = {
      green: !!data.nft.green,
      royalty: data.nft.royalty,
      totalCopies: data.nft.total_copies,
      author: data.nft.author,
      creatorName: data.nft.creator_name || '',
      creatorWebsite: data.nft.creator_website,
      creatorWrittenStatement: data.nft.creator_written_statement,
      nftTitle: data.nft.nft_title,
      nftType: data.nft.nft_type,
      nftSeriesName: data.nft.nft_series_name,
      nftCreationVideoYoutubeUrl: data.nft.nft_creation_video_youtube_url,
      nftKeywordSet: data.nft.nft_keyword_set,
      dataDash: data.nft.data_hash,
      originalFileSizeInBytes: data.nft.original_file_size_in_bytes,
      fileType: data.nft.file_type,
      makePubliclyAccessible: !!data.nft.make_publicly_accessible,
      ddAndFingerprintsIc: data.nft.dd_and_fingerprints_ic,
      ddAndFingerprintsMax: data.nft.dd_and_fingerprints_max,
      ddAndFingerprintsIds: data.nft.dd_and_fingerprints_ids
        ? JSON.parse(data.nft.dd_and_fingerprints_ids)
        : [],
      rqIc: data.nft.rq_ic,
      rqMax: data.nft.rq_max,
      rqOti: data.nft.rq_oti,
      collectionName: data.nft.collection_name,
      collectionAlias: data.nft.collection_alias,
      transactionHash: data?.nft?.transactionHash,
      transactionTime: data?.nft?.transactionTime,
      username: data?.nft?.username,
      memberSince: data?.nft?.memberSince,
      image: data.nft.image,
      pastel_block_hash_when_request_submitted: data.nft.pastel_block_hash_when_request_submitted,
      pastel_block_height_when_request_submitted:
        data.nft.pastel_block_height_when_request_submitted,
      utc_timestamp_when_request_submitted: data.nft.utc_timestamp_when_request_submitted,
      pastel_id_of_submitter: data.nft.pastel_id_of_submitter,
      pastel_id_of_registering_supernode_1: data.nft.pastel_id_of_registering_supernode_1,
      pastel_id_of_registering_supernode_2: data.nft.pastel_id_of_registering_supernode_2,
      pastel_id_of_registering_supernode_3: data.nft.pastel_id_of_registering_supernode_3,
      is_pastel_openapi_request: data.nft.is_pastel_openapi_request,
      dupe_detection_system_version: data.nft.dupe_detection_system_version,
      is_likely_dupe: data.nft.is_likely_dupe,
      overall_rareness_score: data.nft.overall_rareness_score,
      is_rare_on_internet: data.nft.is_rare_on_internet,
      pct_of_top_10_most_similar_with_dupe_prob_above_25pct:
        data.nft.pct_of_top_10_most_similar_with_dupe_prob_above_25pct,
      pct_of_top_10_most_similar_with_dupe_prob_above_33pct:
        data.nft.pct_of_top_10_most_similar_with_dupe_prob_above_33pct,
      pct_of_top_10_most_similar_with_dupe_prob_above_50pct:
        data.nft.pct_of_top_10_most_similar_with_dupe_prob_above_50pct,
      rareness_scores_table_json_compressed_b64: data.nft.rareness_scores_table_json_compressed_b64,
      open_nsfw_score: data.nft.open_nsfw_score,
      image_fingerprint_of_candidate_image_file: data.nft.image_fingerprint_of_candidate_image_file,
      nsfw_score: data.nft.nsfw_score,
      internet_rareness: data.nft.internet_rareness,
      alternative_nsfw_scores: data.nft.alternative_nsfw_scores,
      blockHeight: data.nft.blockHeight,
      currentOwnerPastelID: data.nft.currentOwnerPastelID,
      rawData: data.nft.rawData,
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

export function useItemActivity(
  txid: string,
  offset: number,
  limit: number,
  activitiesType: string,
) {
  let type = activitiesType;
  if (activitiesType.indexOf('all')) {
    type = 'all';
  }
  const { data, isLoading } = useSWR<{ items: TItemActivity[]; totalItems: number }>(
    `${URLS.GET_ITEM_ACTIVITY_OF_NFT_DETAILS_URL}?registration_ticket_txid=${txid}&offset=${offset}&limit=${limit}&type=${type}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.items || null,
    totalItems: data?.totalItems || 0,
    isLoading,
  };
}

export function useCollectionRelated(txid: string, collectionId: string) {
  const { data, isLoading } = useSWR<{ items: ICollectionItem[] }>(
    `${URLS.GET_COLLECTION_RELATED}?txId=${txid}&collection_id=${collectionId}&limit=12`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.items || null,
    isLoading,
  };
}

export function useOffers(txid: string, offset: number, limit: number) {
  const { data, isLoading } = useSWR<{ items: TAcceptedOffer[]; totalItems: number }>(
    `${URLS.GET_OFFERS_OF_NFT_DETAILS_URL}?registration_ticket_txid=${txid}&offset=${offset}&limit=${limit}`,
    axiosGet,
    SWR_OPTIONS,
  );

  return {
    data: data?.items || null,
    totalItems: data?.totalItems || 0,
    isLoading,
  };
}
