
/* -------- Find role by ID -------- */
export const findRoleById = (roles, id) =>
  roles.find((role) => String(role._id) === String(id));

/* -------- Get available roles -------- */
export const getAvailableRoles = (savedItems, roles) => {
  const rolesMap = new Map();

  savedItems.roleQuestions.forEach((question) => {
    if (question.roleId && question.roleId._id) {
      rolesMap.set(String(question.roleId._id), question.roleId.roleName);
    }
  });

  savedItems.jobs.forEach((job) => {
    const found = roles.find((role) => role.roleName === job.roleName);

    if (found) {
      rolesMap.set(String(found._id), found.roleName);
    }
  });

  return Array.from(rolesMap.entries()).map(([id, name]) => ({
    _id: id,
    roleName: name,
  }));
};
