import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, User } from "firebase/auth";
import app from "../../firebaseConfig";

export const requireAuth =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      user: User
    ) => Promise<void>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const auth = getAuth(app);
      const user = auth.currentUser;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await handler(req, res, user);
    } catch (error) {
      console.error("Error in authentication middleware:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
