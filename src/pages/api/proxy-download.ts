// /pages/api/proxy-download.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fileUrl = req.query.fileUrl as string;

  try {
    const response = await fetch(fileUrl);

    // Check if the external file request was successful
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Error fetching file from external server' });
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileUrl.substring(fileUrl.lastIndexOf('/') + 1)}`
    );
    res.send(Buffer.from(buffer));
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
