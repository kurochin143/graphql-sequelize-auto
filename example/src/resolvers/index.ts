import permissionResolvers from "./permissionResolvers";
import roleResolvers from "./roleResolvers";
import userResolvers from "./userResolvers";

const graphqlResolvers = {
	...userResolvers,
	...permissionResolvers,
	...roleResolvers,
};

export default graphqlResolvers;
