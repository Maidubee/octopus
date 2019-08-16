const checkIfTeammember = (userId, projectMembers = []) => {
  if (!userId || projectMembers.length === 0) return false;
  return projectMembers.map(member => member._id).includes(userId);
};

const rules = {
  innovator: {
    dynamic: {
      "experiment:create": ({ userId, projectMembers }) =>
        checkIfTeammember(userId, projectMembers),
      "experiment:edit": ({ userId, projectMembers }) => checkIfTeammember(userId, projectMembers)
    }
  },
  admin: {
    static: [
      "project:create",
      "project:delete",
      "experiment:create",
      "experiment:edit",
      "experiment:delete",
      "users:list",
      "teammember:delete"
    ]
  }
};

export default rules;
