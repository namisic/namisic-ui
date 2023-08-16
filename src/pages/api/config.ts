import { ConfigResponse } from '@/types/config-response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConfigResponse>
) {
  res.status(200).json({
    RoleNames: {
      Administrator: process.env.RN_ADMINISTRATOR!,
      SecurityGuard: process.env.RN_SECURITYGUARD!,
    },
    ApiUri: process.env.API_URI!,
  });
}
