import { getPayloadHMR } from '@payloadcms/next/utilities';
import config from '@payload-config';
import { Payload } from 'payload';

export const fetchCollectionLuoghi = async () => {
  const payload: Payload = await getPayloadHMR({ config });

  const result = await payload.find({
    collection: 'luoghi',
  });

  return result;
};