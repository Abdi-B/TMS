import { Roles } from "./enum_types.js";

const isAuthorized =
  (authorizedRole = Roles.ADMIN) =>
  (req, res, next) => {
    console.log("checking authorization role:", authorizedRole);
    try {
      let user = req.auth_user;
      // console.log("inside authorization", { user });

      // Check if user role matches the authorizedRole
      if (user.role === authorizedRole || user.role === Roles.SUPERADMIN) {
        req.auth_user = user;
        next(); // Proceed to the next middleware
        return;
      } else {
        return res.status(403).json({ message: "User not authorized" });
      }
    } catch (error) {
      // In case of any error, respond with a 403 status
      return res.status(403).json({ message: "User not authorized" });
    }
  };

const isSuperAuthorized =
  (authorizedRole = Roles.SUPERADMIN) =>
  (req, res, next) => {
    console.log("checking authorization role:", authorizedRole);
    try {
      let user = req.auth_user;
      // console.log("inside authorization", { user });

      // Check if user role matches the authorizedRole
      if (user.role === authorizedRole) {
        req.auth_user = user;
        next(); // Proceed to the next middleware
        return;
      } else {
        return res.status(403).json({ message: "User not authorized" });
      }
    } catch (error) {
      // In case of any error, respond with a 403 status
      return res.status(403).json({ message: "User not authorized" });
    }
  };

export { isAuthorized, isSuperAuthorized };
