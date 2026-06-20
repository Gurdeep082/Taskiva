import jwt from "jsonwebtoken";
import Tasker from "../models/Tasker.js";

export const protect = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Check tasker status
      if (decoded.role === "tasker") {
        const tasker = await Tasker.findById(decoded.id);

        if (!tasker) {
          return res.status(404).json({
            forceLogout: true,
            message: "Your account no longer exists.",
          });
        }

        if (
          tasker.taskerApprovalStatus === "banned" ||
          tasker.taskerApprovalStatus === "deleted" ||
          tasker.isActive === false
        ) {
          return res.status(403).json({
            forceLogout: true,
            message:
              tasker.accountMessage ||
              "Your account has been disabled by the administrator.",
          });
        }
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      next();
    } catch {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  };
};