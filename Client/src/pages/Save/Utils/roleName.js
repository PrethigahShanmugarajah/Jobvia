/* -------- Get role name -------- */
export const getRoleName = (role) =>
  typeof role === "object" && role !== null ? role.roleName || "" : role || "";
