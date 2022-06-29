// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "interfaces/response-data";

import { validate } from "../../utils/form-validator";
import { ErrorTypes } from "../../enums/error-types";
import { errorMapper } from "../../utils/error-mapper";

// Middleware service in backend that manages these (authentication/roles/...)
// 400 – Bad Request
// 401 – Unauthorized
// 403 – Forbidden
// 404 – Not Found

const formPostHandler = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<any>>
) => {
  try {
    if (req.method !== "POST") {
      res.status(405).send({
        errors: [
          {
            message: "Method is not allowed on this route",
            type: ErrorTypes.BAD_REQUEST,
          },
        ],
      });
    }

    const { error, value: data } = validate(req.body);

    if (error) {
      res.status(400).json({ errors: errorMapper(error.details) });
    }

    // Save to database code, at this point the formdata is validated...
    // saveToDatabase(data)

    // Notify frontend of success
    return res.status(200).json({ data: "OK" });
  } catch (err: any) {
    // Log to Sentry/logrocket/...
    // 405 – Method Not allowed
    return res.status(400).send({
      errors: [
        {
          message: err && err.toString(),
          type: (err && err.type) || "BAD_REQUEST",
        },
      ],
    });
  }
};

export default formPostHandler;
