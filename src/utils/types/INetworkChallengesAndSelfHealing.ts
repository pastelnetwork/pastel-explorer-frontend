interface IChallenge {
  block: number;
  merkelroot: string;
  timestamp: string;
  file_hash: string;
  start_index: number;
  end_index: number;
}

interface IHealthCheckChallengesChallenge {
  block: number;
  merkelroot: string;
  timestamp: string;
}

interface IObserverEvaluation {
  is_challenge_timestamp_ok: boolean;
  is_process_timestamp_ok: boolean;
  is_evaluation_timestamp_ok: boolean;
  is_recipient_signature_ok: boolean;
  is_challenger_signature_ok: boolean;
  is_evaluation_result_ok: boolean;
  timestamp: string;
}

export interface IStorageChallenges {
  challenge_id: string;
  message_type: string;
  sender_id: string;
  challenger_id: string;
  challenge?: IChallenge;
  observers: string[];
  recipient_id: string;
}

export interface IHealthCheckChallenges {
  challenge_id: string;
  message_type: string;
  sender_id: string;
  challenger_id: string;
  challenge?: IHealthCheckChallengesChallenge;
  observers: string[];
  recipient_id: string;
  observer_evaluation?: IObserverEvaluation;
}

interface IMessage {
  trigger_id: string;
  message_type: string;
  sender_id: string;
  sender_signature?: string;
  data: {
    challenger_id: string;
    recipient_id: string;
    response?: {
      challenge_id: string;
      block: number;
      merkelroot: string;
      timestamp: string;
      responded_ticket: {
        tx_id: string;
        ticket_type: string;
        missing_keys: string[];
        reconstructed_file_hash?: string;
        sense_file_ids?: string[];
        is_reconstruction_required: boolean;
      };
      verifiers: string[];
    };
    verification?: {
      challenge_id: string;
      block: number;
      merkelroot: string;
      timestamp: string;
      verified_ticket: {
        tx_id: string;
        ticket_type: string;
        missing_keys: string[];
        is_reconstruction_required: boolean;
        is_verified: boolean;
        message: string;
      };
    };
  };
}

interface IReportMessages {
  message_type: string;
  messages: IMessage[];
}

export interface ISelfHealingTriggers {
  event_id: string;
  report: {
    messages: IReportMessages[];
  };
}
